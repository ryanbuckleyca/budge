import React from 'react';
import { Row, Card } from '../styles';
import { Text, View } from 'react-native';
import {Obj} from '../interfaces';

function ListLogs(props:any) {
  const logs = props.logs

  if(!logs) return (<Text style={{color: 'white'}}>Loading...</Text>)

  return(
    <View style={{backgroundColor: '#222', height: '100%'}}>
      <Text style={{color: 'white'}}>
        { logs && ((logs.length || 'no') + 'items in LOG:') }
      </Text>
      <Row>
        <Text style={{color: 'white'}}>Amount</Text>
        <Text style={{color: 'white'}}>Description</Text>
        <Text style={{color: 'white'}}>Category</Text>
      </Row>

      {
        logs.map((log:any) => {
          const { Type, Amount, Description, Category } = log.fields
          return(
            <Card key={log.id}>
              <Row>
                <View>
                  <Text style={{color: Type === 'Expense' ? 'red' : 'green' }}>{ Amount }</Text>
                </View>
                <View><Text style={{color: 'white'}}>{ Description }</Text></View>
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
