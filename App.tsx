import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { getLogRecords, uploadRecords, getBudgetRecords } from './utils/airtable'
import { useNetInfo } from "@react-native-community/netinfo";
import { Container, Content } from './styles'
import { Entry, Obj } from './interfaces'
import { loadOfflineData, saveOfflineData } from './utils/async-storage'
import Menu from './components/menu'
import ListLogs from './components/list-logs'
import EntryForm from './components/entry-form'

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
      if(queue) {
        sendEntries(queue)
      }
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
    if (netInfo.isConnected) {
      sendEntries([entry])
      alert('your entry was successfully logged')
    }
    else {
      saveOfflineData("queue", JSON.stringify([entry]))
      .then(res => alert('entry will be added when you reconnect'))
      .catch(err => console.log('saveOfflineData error: ', err))    
    }
    setEntry(blankEntry)
  }

  if(!cats) {
    return "Loading..."
  }

  return (
    <Container>
      <Menu />
      <Content>
        <EntryForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setEntry={setEntry}
          entry={entry}
          setShowNumPad={setShowNumPad}
          showNumPad={showNumPad}
          cats={cats}
        />
      {/*
        <ListLogs logs={logs} />
      */}
      </Content>
      <StatusBar style="auto" />
    </Container>
  );
}

export default App;
