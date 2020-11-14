import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getLogRecords, postLogRecord } from './scripts/airtable.js'

function App() {
  const [ data, setData ] = useState([]);
  const [ entry, setEntry ] = useState({});

  useEffect(() => {
    getLogRecords()
    .then(data => setData(data.records))
    .catch(err => console.log('fetch error: ', err.message))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    entry[name] = name === 'Amount' ? parseFloat(value) : value
    console.log('entry is now ', entry)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: perform checks before POSTing
    postLogRecord(entry)
    .then(data => console.log(data))

  }

  const printLogs = data.map(record => {
    const { Type, Amount, Description, Category, Notes } = record.fields
    return (
      <tr key={record.id} style={styles.textLeft}>
        <td>
          <h2 style={{ color: Type === 'Expense' ? 'red' : 'green' }}>
            { Amount }
          </h2>
        </td>
        <td><strong>{ Description }</strong></td>
        <td>{ Category }</td>
        <td>{ Notes }</td>
      </tr>
    )
  })

  const newEntry =
    <tr style={styles.textLeft}>
      <td>
        <input type="number" name="Amount" value={entry.Amount} onChange={(e) => handleChange(e)} />
        <span>
          <input type="radio" name="Type" value="Expense" selected={entry.Type==='Expense'} onChange={(e) => handleChange(e)} />
          Expense
          <input type="radio" name="Type" value="Income" selected={entry.Type==='Income'} onChange={(e) => handleChange(e)} />
          Income
        </span>
      </td>
      <td>
        <input type="text" name="Description" value={ entry.Description } onChange={(e) => handleChange(e)} />
      </td>
      <td>
        <input type="text" name="Category" value={ entry.Category } onChange={(e) => handleChange(e)} />
      </td>
      <td>
        <span style={styles.nowrap}>
        <input type="text" name="Notes" value={ entry.Notes } onChange={(e) => handleChange(e)} />
        <button onClick={(e) => handleSubmit(e)}>+</button>
        </span>
      </td>
    </tr>

  return (
    <View style={ styles.container }>
      <Text style={styles.h}>{ `${ data.length } items in LOG:` }</Text>
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
          { newEntry }
          { printLogs }
          </tbody>
        </table>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3em'
  },
  w100: {
    width: '100%',
  },
  textLeft: {
    textAlign: 'left',
  },
  nowrap: {
    whiteSpace: 'nowrap'
  }
}

export default App;
