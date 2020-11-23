import React, {useState, useEffect, Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { getLogRecords, postLogRecord } from './scripts/airtable.tsx'
// components
import ListLogs from './components/list-logs.tsx'
import EntryForm from './components/entry-form.tsx'
import {Container, Content, Menu, Icon, Table, Row} from './styles.tsx'

function App() {
  const newEntry = {
    Type: 'Expense', Amount: '', Description: '', Category: '', Notes: ''
  }
  const [ logs, setLogs ] = useState();
  const [ entry, setEntry ] = useState(newEntry);

  useEffect(() => {
    getLogRecords()
      .then(data => setLogs(data.records))
      .catch(err => console.log('fetch error: ', err))
  }, [])

  useEffect(()=>{
    console.log('entry state changed to ', entry)
  }, [entry])

  const handleChange = (name, value) => {
    entry[name] = name === 'Amount' ? parseFloat(value) : value
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
      <Menu>
        <Icon><Text>b</Text></Icon>
        <Icon><Text>u</Text></Icon>
        <Icon><Text>d</Text></Icon>
        <Icon><Text>g</Text></Icon>
        <Icon><Text>e</Text></Icon>
      </Menu>
      <Content>
        <EntryForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setEntry={setEntry}
          entry={entry}
        />
        {/* <ListLogs logs={logs} /> */}
      </Content>
      <StatusBar style="auto" />
    </Container>
  );
}

export default App;
