import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import {Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getLogRecords, uploadRecords, getCatRecords } from './utils/airtable'
import { useNetInfo } from "@react-native-community/netinfo";
import { Container, Content } from './styles'
import { Entry, Obj } from './interfaces'
import { loadOfflineData, saveOfflineData } from './utils/async-storage'
import Menu from './components/menu'
import ListLogs from './components/list-logs'
import EntryForm from './components/entry-form'
import { weekInfo } from './utils/dates';

// TODO: introduce React.Context
// props such as Logs are being passed down almost 5 layers

const Tab = createMaterialTopTabNavigator();

const blankEntry:Obj = {
  Type: 'Expense', Amount: '', Vendor: '', Category: [], Notes: ''
}

const parseEntryAmt = (entries:Array<Obj>) => (
  entries.map((entry) => (
    {...entry, Amount: parseInt(entry.Amount)} as Entry
  )
))

function App() {
  const netInfo = useNetInfo();
  const [ logs, setLogs ] = useState([,]);
  const [ cats, setCats ] = useState([]);
  const [ entry, setEntry ] = useState<Obj>(blankEntry);
  const [ showNumPad, setShowNumPad ] = useState(true);
  const [ queue, setQueue ] = useState<Array<Obj>>();
  
  useEffect(() => {
    loadOfflineData('queue').then(res => {
      res && setQueue(JSON.parse(res))
    })
  }, [])
  
  useEffect(() => {
    if (netInfo.isConnected) {
      queue && queue.length > 0 && sendEntries(queue)
      loadDataFrAPI()
    } 
    else {
      loadDataFrCache()
    }
  }, [netInfo.isConnected])

  const sendEntries = async (entries:Array<Obj>) => {
    try {
      const req = await uploadRecords(parseEntryAmt(entries))
      if(req.error) throw Error(req.error.message)

      setQueue([])
      saveOfflineData('queue', '[]')
      loadDataFrAPI()
      alert('your entry was successfully logged')
    } catch (err) { 
      const msg = 'error sending entries: ' + err
      console.log(msg)
      alert(msg)
    }
  }

  const loadDataFrAPI = async () => {
    try {
      const cats = await getCatRecords()
      const logs = await getLogRecords()
      saveOfflineData("cats", JSON.stringify(cats.records))
      saveOfflineData("logs", JSON.stringify(logs.records))
      setCats(cats.records)
      setLogs(logs.records)
    } catch (err) {
      console.log(`error loading from API: `, err)
    }
  }

  const loadDataFrCache = async () => {
    try {
      const logs = await loadOfflineData("logs") || "[]"
      logs && setLogs(JSON.parse(logs))
      const cats = await loadOfflineData("cats") || "[]"
      cats && setCats(JSON.parse(cats))
    } catch (err) {
      console.log(`error loading from local storage: `, err)
    }
  }

  const handleChange = (name: string, value: string) => {
    entry[name] = (name === 'Amount') ? parseFloat(value) : value
    setEntry({...entry})
  }

  const handleSubmit = (e:Obj) => {
    e.preventDefault();
    // TODO: perform verification of form data
    const d = weekInfo(new Date)
    const payload = { 
      ...entry, 
      Time: new Date,
      WeekOfMonth: d.WeekOfMonth,
      WeekOfYear: d.WeekOfYear,
      WeekID: d.WeekID
    }

    if (netInfo.isConnected) {
      sendEntries([payload])
    }
    else {
      saveOfflineData("queue", JSON.stringify([payload]))
      .then(res => alert('entry will be added when you reconnect'))
      .catch(err => console.log('saveOfflineData error: ', err))    
    }
    setEntry(blankEntry)
  }

  if(!cats || !logs) {
    return <Text>Loading....</Text>
  }

  return (
    <NavigationContainer>
      <Container>
        <Content>
          <Tab.Navigator tabBar={
            props => <Menu 
              logs={logs}
              cats={cats}
              nav={props.navigation} />
          }>
            <Tab.Screen name="Home">
              {
              props => <EntryForm 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setEntry={setEntry}
                entry={entry}
                logs={logs}
                setShowNumPad={setShowNumPad}
                showNumPad={showNumPad}
                cats={cats} />
              }
            </Tab.Screen>
            <Tab.Screen name="Logs">
              {
              props => <ListLogs 
                logs={logs} 
                cats={cats} />
              }
            </Tab.Screen>
          </Tab.Navigator>
        </Content>
        <StatusBar style="auto" />
      </Container>
    </NavigationContainer>
  );
}

export default App;
