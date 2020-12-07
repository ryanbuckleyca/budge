import React from 'react';
import { Row, Card } from '../styles'
import { Text, View } from 'react-native';
import { withTheme } from 'styled-components';

function ListLogs(props) {
  const logs = props.logs

  if(!logs)
    return <Text style={{color: 'white'}}>Loading...</Text>

  return(
    <View style={{backgroundColor: '#222', height: '100%'}}>
      <Text style={{color: 'white'}}>
        { `${ logs && logs.length || 'no' } items in LOG:` }
      </Text>
      <Row>
        <Text style={{color: 'white'}}>Amount</Text>
        <Text style={{color: 'white'}}>Description</Text>
        <Text style={{color: 'white'}}>Categoriy</Text>
      </Row>

      {
        logs.map(log => {
          const { Type, Amount, Description, Category } = log.fields
          return(
            <Card key={log.id}>
              <Row>
                <View>
                  <Text style={{color: Type === 'Expense' ? 'red' : 'green' }}>{ Amount }</Text>
                </View>
                <View><Text style={{color: 'white'}}>{ Description }</Text></View>
                {/* TODO: Category is a controlled list */}
                {/* Categories should be part of the Budget section */}
                {/* https://www.npmjs.com/package/react-select2-native */}
                <View><Text style={{color: 'white'}}>{ Category }</Text></View>
              </Row>
            </Card>
          )
        })
      }
    </View>
  )
}

export default ListLogs;
