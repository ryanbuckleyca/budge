import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { getLogRecords, postLogRecord, getBudgetRecords } from './scripts/airtable'
// components
import Menu from './components/menu'
import ListLogs from './components/list-logs'
import EntryForm from './components/entry-form'
import {Container, Content} from './styles'
import {Entry, Obj} from './interfaces'

function App() {
  const newEntry:Entry = {
    Type: 'Expense', Amount: '', Description: '', Category: [], Notes: ''
  }
  const [ logs, setLogs ] = useState([,]);
  const [ cats, setCats ] = useState();
  const [ entry, setEntry ] = useState<Entry>(newEntry);
  const [ showNumPad, setShowNumPad ] = useState(true);

  useEffect(() => {
    getLogRecords()
      .then(data => {
        setLogs(data.records)
        localStorage.setItem("logs", JSON.stringify(data.records))
      })
      .catch(err => console.log('fetch log error: ', err))
    getBudgetRecords()
      .then(data => {
        setCats(data.records)
        localStorage.setItem("cats", JSON.stringify(data.records))
      })
      .catch(err => console.log('fetch cats error: ', err))
  }, []) //first render

  useEffect(()=>{
    localStorage.setItem("entry", JSON.stringify(entry))
    console.log('logs from localStorage: ', localStorage.getItem("logs"))
  }, [entry]) //only when entry changes

  const handleChange = (name: string, value: string) => {
    console.log('state of entry WAS: ', entry)
    entry[name] = (name === 'Amount') ? parseFloat(value) : value
    console.log(name, ' is ', value) 
    setEntry({...entry})
  }

  const handleSubmit = (e:Obj) => {
    e.preventDefault();
    // TODO: perform checks before POST
    postLogRecord({...entry, Amount: parseInt(entry.Amount)})
      .then(res => {
        setLogs([res, ...logs])
        // TODO: update localStorage too
      })
      .catch(err => console.log('error in posting: ', err))
      .finally(() => console.log('submitted: state of logs is ', logs))
    setEntry(newEntry)
    
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
