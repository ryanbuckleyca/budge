import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getLogRecords, postLogRecord } from './scripts/airtable.tsx'
// components
import ListLogs from './components/list-logs.tsx'
import EntryForm from './components/log-entry-form.tsx'
import styles from './styles.tsx'

function App() {
  const blankEntry = {
    Type: 'Expense', Amount: '', Description: '', Category: '', Notes: ''
  }
  const [ logs, setLogs ] = useState();
  const [ entry, setEntry ] = useState(blankEntry);

  useEffect(() => {
    getLogRecords()
      .then(data => setLogs(data.records))
      .catch(err => console.log('fetch error: ', err.message))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    entry[name] = name === 'Amount' ? parseFloat(value) : value
    setEntry({...entry})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: perform checks before POSTing
    postLogRecord(entry)
      .then(res => setLogs([res, ...logs]))
      .catch(err => console.log('error in posting: ', err))
      .finally(console.log('submitted: state of logs is ', logs))
    setEntry(blankEntry)
  }

  return (
    <View style={ styles.container }>
      <Text style={styles.h}>
        { `${ logs && logs.length || 'no' } items in LOG:` }
      </Text>
      <View style={styles.w100}>
        <table style={styles.w100}>
          <thead style={styles.textLeft}>
            <tr>
              <td>AMOUNT</td>
              <td>DESCRIPTION</td>
              <td>CATEGORY</td>
              <td>NOTES</td>
            </tr>
          </thead>
          <tbody>
          <EntryForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            entry={entry} />
          {logs && (logs.length > 0) && <ListLogs logs={logs} />}
          </tbody>
        </table>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default App;
