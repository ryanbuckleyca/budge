import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AIRTABLE_ID } from '@env';

function App() {
  const [ data, setData ] = useState([]);
  const [ entry, setEntry ] = useState({});

  const airTableURL = 'https://api.airtable.com/v0/appA67zYW50gE6q8E/LOG'
  const APIpost = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AIRTABLE_ID}`
    },
    data: {
      "records": [
        {
          "fields": {}
        },
        {
          "fields": {}
        }
      ]
    }
  }
  const APIget = {
    method: 'GET',
    headers: { Authorization: `Bearer ${AIRTABLE_ID}` },
  }

  useEffect(() => {
    fetch(airTableURL, APIget)
    .then(res => res.json())
    .then(data => setData(data.records))
  }, [])

  const handleChange = (e) => {
    entry[e.target.name] = e.target.value
    console.log('entry is now ', entry)
  }

  const printLogs = data.map(record => {
    const { Type, Amount, Description, Notes } = record.fields
    return (
      <tr key={record.id} style={styles.textLeft}>
        <td>
          <h2 style={{ color: Type === 'Expense' ? 'red' : 'green' }}>
            { Amount }
          </h2>
        </td>
        <td><strong>{ Description }</strong></td>
        <td>{ Type }</td>
        <td>{ Notes }</td>
      </tr>
    )
  })

  const newEntry =
    <tr style={styles.textLeft}>
      <td>
        <input type="text" name="amount" value={entry.Amount} onChange={(e) => handleChange(e)} />
        <span>
          <input type="radio" name="type" value="Expense" selected={entry.Type==='Expense'} onChange={(e) => handleChange(e)} />
          Expense
          <input type="radio" name="type" value="Income" selected={entry.Type==='Income'} onChange={(e) => handleChange(e)} />
          Income
        </span>
      </td>
      <td>
        <input type="text" name="description" value={ entry.Description } onChange={(e) => handleChange(e)} />
      </td>
      <td>
        <input type="text" name="type" value={ entry.Type } onChange={(e) => handleChange(e)} />
      </td>
      <td>
        <span style={styles.nowrap}>
        <input type="text" name="notes" value={ entry.Notes } onChange={(e) => handleChange(e)} />
        <button>add</button>
        </span>
      </td>
    </tr>

  return (
    <View style={ styles.container }>
      <Text style={styles.h}>{ `${ data.length } items in LOG:` }</Text>
      <Text style={styles.w100}>
        <table style={styles.w100}>
          <thead style={styles.textLeft}>
            <tr>
              <td>AMOUNT</td>
              <td>DESCRIPTION</td>
              <td>TYPE</td>
              <td>NOTES</td>
            </tr>
          </thead>
          <tbody>
          { newEntry }
          { printLogs }
          </tbody>
        </table>
      </Text>
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
