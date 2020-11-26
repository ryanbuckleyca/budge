import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { getLogRecords, postLogRecord, getBudgetRecords } from './scripts/airtable'
// components
import Menu from './components/menu'
import ListLogs from './components/list-logs'
import EntryForm from './components/entry-form'
import {Container, Content} from './styles'

function App() {
  const newEntry = {
    Type: 'Expense', Amount: '', Description: '', Category: [], Notes: ''
  }
  const [ logs, setLogs ] = useState();
  const [ cats, setCats ] = useState();
  const [ entry, setEntry ] = useState(newEntry);
  const [ showNumPad, setShowNumPad ] = useState(true);

  useEffect(() => {
    getLogRecords()
      .then(data => setLogs(data.records))
      .catch(err => console.log('fetch log error: ', err))
    getBudgetRecords()
      .then(data => setCats(data.records))
      .catch(err => console.log('fetch cats error: ', err))
  }, [])

  useEffect(()=>{
    console.log('entry state changed to ', entry)
  }, [entry])

  const handleChange = (name: string, value: string) => {
    console.log('state of entry WAS: ', entry)
    entry[name] = (name === 'Amount') ? parseFloat(value) : value
    console.log(name, ' is ', value)
    setEntry({...entry})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: perform checks before POST
    postLogRecord(entry)
      .then(res => setLogs([res, ...logs]))
      .catch(err => console.log('error in posting: ', err))
      .finally(console.log('submitted: state of logs is ', logs))
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
