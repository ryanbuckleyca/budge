import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { getLogRecords, postToLogs, getBudgetRecords } from './scripts/airtable'
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";
// components
import Menu from './components/menu'
import ListLogs from './components/list-logs'
import EntryForm from './components/entry-form'
import {Container, Content} from './styles'
import {Entry, Obj} from './interfaces'

const parseEntries = (entries:Array<Obj>) => (
  entries.map((entry) => (
    {...entry, Amount: parseInt(entry.Amount)} as Entry
  )
))
const queuedEntries = JSON.parse(
  localStorage.getItem("queue") || '{"empty":true}'
)
const blankEntry:Obj = {
  Type: 'Expense', Amount: '', Description: '', Category: [], Notes: ''
}
 
function App() {
  const netInfo = useNetInfo();
  const [ logs, setLogs ] = useState([,]);
  const [ cats, setCats ] = useState();
  const [ entry, setEntry ] = useState<Obj>(blankEntry);
  const [ queue, setQueue ] = useState<Array<Entry>>([]);
  const [ showNumPad, setShowNumPad ] = useState(true);

  const sendEntries = (entries:Array<Obj>) => {
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
    !queuedEntries.empty
      ? sendEntries(queuedEntries) // also fetches
      : fetchRecords("logs", getLogRecords, setLogs)
    fetchRecords("cats", getBudgetRecords, setCats)
  }
  const loadDataFrCache = () => {
    const localLogs = JSON.parse(
      localStorage.getItem("logs") || '{"empty":true}'
    )
    setLogs(localLogs)
    const localCats = JSON.parse(
      localStorage.getItem("cats") || '{"empty":true}'
    )
    setCats(localCats)
  }

  useEffect(() => {
    netInfo.isConnected
      ? loadDataFrAPI()
      : loadDataFrCache()
  }, [])

  const handleChange = (name: string, value: string) => {
    entry[name] = (name === 'Amount') ? parseFloat(value) : value
    setEntry({...entry})
  }
  const handleSubmit = (e:Obj) => {
    e.preventDefault();
    if(netInfo.isConnected) {
      sendEntries([entry])
      setEntry(blankEntry)
    }
    else {
      queue.push(parseEntries([entry])[0])
      setQueue(queue)
    }
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
