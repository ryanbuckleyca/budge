import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AIRTABLE_ID } from '@env';

function App() {
  const [ data, setData ] = useState();
  
  const airTableURL = 'https://api.airtable.com/v0/appA67zYW50gE6q8E/BUDGET'
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
    .then(data => console.log(data))

  }, [])

  return (
    <View style={styles.container}>
      <Text>{'state is ', data}</Text>
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
});

export default App;
