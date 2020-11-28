import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { getLogRecords, postToLogs, getBudgetRecords } from './scripts/airtable'
import {useNetInfo} from "@react-native-community/netinfo";
import Menu from './components/menu'
import ListLogs from './components/list-logs'
import EntryForm from './components/entry-form'
import {Container, Content} from './styles'
import {Entry, Obj} from './interfaces'

const blankEntry:Obj = {
  Type: 'Expense', Amount: '', Description: '', Category: [], Notes: ''
}

const parseEntries = (entries:Array<Obj>) => (
  entries.map((entry) => (
    {...entry, Amount: parseInt(entry.Amount)} as Entry
  )
))
const queuedEntries:Array<Obj> = localStorage.getItem("queue")
  ? JSON.parse(localStorage.getItem("queue") || '')
  : []
 
function App() {
  console.log('queuedEntries value at start is ', queuedEntries)
  console.log('localStorage.getItem("queue") value at start is ', localStorage.getItem("queue"))
  
  const netInfo = useNetInfo();
  const [ logs, setLogs ] = useState([,]);
  const [ cats, setCats ] = useState();
  const [ entry, setEntry ] = useState<Obj>(blankEntry);
  const [ showNumPad, setShowNumPad ] = useState(true);
  const [ queue, setQueue ] = useState<Array<Obj>>(queuedEntries);

  const sendEntries = (entries:Array<Obj>) => {
    console.log('queue not empty...will post: ', queue)
    postToLogs(parseEntries(entries))
      .then(res => setLogs([res, ...logs]))
      .catch(err => console.log('error in sending queued entries: ', err))
      .finally(() => console.log('submitted queued entries: state of logs is ', logs))
  }
  const fetchRecords = async (tableName: string, callFunction: Function, setState: Function) => {
    try {
      const data = await callFunction()
      setState(data.records)
      localStorage.setItem(tableName, JSON.stringify(data.records))
    } catch(err) {
      console.log(`fetch ${tableName} error: `, err)
    }
  }

  const loadDataFrAPI = () => {
    queuedEntries
      ? sendEntries(queuedEntries) // also sets logs
      : fetchRecords("logs", getLogRecords, setLogs)
    fetchRecords("cats", getBudgetRecords, setCats)
  }
  const loadDataFrCache = () => {
    const localLogs = JSON.parse(
      localStorage.getItem("logs") || '{"empty":true}'
    )
    const localCats = JSON.parse(
      localStorage.getItem("cats") || '{"empty":true}'
    )
    setLogs(localLogs)
    setCats(localCats)
  }

  useEffect(() => {
    netInfo.isConnected
      ? loadDataFrAPI()
      : loadDataFrCache()
  }, [])
  
  useEffect(() => {
    console.log('queue set to : ', queue)
  }, [queue])

  const handleChange = (name: string, value: string) => {
    entry[name] = (name === 'Amount') ? parseFloat(value) : value
    setEntry({...entry})
  }
  const handleSubmit = (e:Obj) => {
    e.preventDefault();
    if (netInfo.isConnected) {
      sendEntries([entry])
      alert('your entry was successfully logged')
    }
    else {
      localStorage.setItem("queue", JSON.stringify(queue))
      setQueue([...queue, parseEntries([entry])[0]])
      alert('entry will be added when you reconnect')
      console.log('localStorage queue is: ', localStorage.getItem("queue"))
    }
    setEntry(blankEntry)
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
