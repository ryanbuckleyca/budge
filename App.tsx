import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AIRTABLE_ID } from '@env';

function App() {
  const [ data, setData ] = useState([]);

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

  const printLogs = data.map(record => {
    const { Type, Amount, Description, Notes } = record.fields
    return <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <h2 style={{ color: Type === 'Expense' ? 'red' : 'green' }}>
        { Amount }
      </h2>
      <strong>{ Description }</strong>
      <span>{ Notes }</span>
      <span>{ Type }</span>
    </div>
  })

  return (
    <View style={ styles.container }>
      <Text>{ `${ data.length } items in LOG: ` }</Text>
      <Text style={ styles.list }>{ printLogs }</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
  }
});

export default App;
