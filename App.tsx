import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image } from 'react-native';
import { getLogRecords, postLogRecord, getBudgetRecords } from './scripts/airtable.tsx'
// components
import ListLogs from './components/list-logs.tsx'
import Clock from './components/clock.tsx'
import Cal from './components/cal.tsx'
import EntryForm from './components/entry-form.tsx'
import {Container, Content, Menu, Icon, Table, Row} from './styles.tsx'

function App() {
  const newEntry = {
    Type: 'Expense', Amount: '', Description: '', Category: [], Notes: ''
  }
  const [ logs, setLogs ] = useState();
  const [ cats, setCats ] = useState();
  const [ entry, setEntry ] = useState(newEntry);

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

  const handleChange = (name, value) => {
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

  console.log('cats are: ', cats)
  console.log('logs are: ', logs)

  return (
    <Container>
      <Menu>
        <Icon><Clock /></Icon>
        <Icon><Cal type='week' /></Icon>
        <Icon><Cal type='month' /></Icon>
        <Icon><Cal type='year' /></Icon>
        <Icon><View style={{width: '100%', height: '100%', border: '10px solid #507272', borderRadius: '50%'}} /></Icon>
      </Menu>
      <Content>
        <EntryForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setEntry={setEntry}
          entry={entry}
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
