import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image } from 'react-native';
import { getLogRecords, postLogRecord, getBudgetRecords } from './scripts/airtable'
// components
import ListLogs from './components/list-logs'
import { PieChart } from 'react-minimal-pie-chart';
import Clock from './components/clock'
import Cal from './components/cal'
import EntryForm from './components/entry-form'
import {Container, Content, Menu, Icon, Row} from './styles'

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

  const handleChange = (name: string, value: string) => {
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
        <Icon>
          <PieChart 
            data={[{ value: 82, color: '#92727D' }]}
            totalValue={100}
            lineWidth={20}
            rounded
            label={({ dataEntry }) => `${dataEntry.value}%`}
            labelStyle={{
              fontSize: '28px',
              fontFamily: 'sans-serif',
              fill: '#92727D',
            }}
            labelPosition={0}          />
        </Icon>
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
