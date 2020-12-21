import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import {Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getLogRecords, uploadRecords, getBudgetRecords } from './utils/airtable'
import { useNetInfo } from "@react-native-community/netinfo";
import { Container, Content } from './styles'
import { Entry, Obj } from './interfaces'
import { loadOfflineData, saveOfflineData } from './utils/async-storage'
import Menu from './components/menu'
import ListLogs from './components/list-logs'
import EntryForm from './components/entry-form'
import { weekInfo } from './utils/dates';

const Tab = createMaterialTopTabNavigator();

const blankEntry:Obj = {
  Type: 'Expense', Amount: '', Description: '', Category: [], Notes: ''
}

const parseEntries = (entries:Array<Obj>) => (
  entries.map((entry) => (
    {...entry, Amount: parseInt(entry.Amount)} as Entry
  )
))

function App() {
  
  useEffect(() => {
    loadOfflineData('queue').then(res => {
      res && setQueue(JSON.parse(res))
    })
  }, [])
  
  const netInfo = useNetInfo();
  const [ logs, setLogs ] = useState([,]);
  const [ cats, setCats ] = useState([]);
  const [ entry, setEntry ] = useState<Obj>(blankEntry);
  const [ showNumPad, setShowNumPad ] = useState(true);
  const [ queue, setQueue ] = useState<Array<Obj>>();

  useEffect(() => {
    if (netInfo.isConnected) {
      queue && sendEntries(queue)
      loadDataFrAPI()
    } 
    else {
      loadDataFrCache()
    }
  }, [netInfo.isConnected])

  const sendEntries = async (entries:Array<Obj>) => {
    try {
      const allEntries = await uploadRecords(parseEntries(entries))
      setLogs(allEntries)
      setQueue([])
      saveOfflineData('queue', '[]')
    } catch (err) { 
      console.log('error sending queued entries: ', err)
    } finally { 
      console.log('submitted queued entries: logs is ', logs)
    }
  }

  const loadDataFrAPI = async () => {
    try {
      const logs = await getLogRecords()
      setLogs(logs.records)
      saveOfflineData("logs", JSON.stringify(logs.records))
      const cats = await getBudgetRecords()
      setCats(cats.records)
      saveOfflineData("cats", JSON.stringify(cats.records))
    } catch (err) {
      console.log(`error loading from API: `, err)
    }
  }
  const loadDataFrCache = async () => {
    try {
      const logs = await loadOfflineData("logs")
      setLogs(JSON.parse(logs))
      const cats = await loadOfflineData("cats")
      setCats(JSON.parse(cats))
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
    const payload = { ...entry, dateInfo: weekInfo(new Date) }

    if (netInfo.isConnected) {
      sendEntries([payload])
      alert('your entry was successfully logged')
    }
    else {
      saveOfflineData("queue", JSON.stringify([payload]))
      .then(res => alert('entry will be added when you reconnect'))
      .catch(err => console.log('saveOfflineData error: ', err))    
    }
    setEntry(blankEntry)
  }

  if(!cats) {
    return <Text>Loading...</Text>
  }

  return (
    <NavigationContainer>
      <Container>
        <Content>
          <Tab.Navigator tabBar={props => <Menu {...props} />}>
            <Tab.Screen name="Home">
              {
              props => <EntryForm 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setEntry={setEntry}
                entry={entry}
                setShowNumPad={setShowNumPad}
                showNumPad={showNumPad}
                cats={cats} />
              }
            </Tab.Screen>
            <Tab.Screen name="Logs">
              {
              props => <ListLogs logs={logs} cats={cats} />
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
