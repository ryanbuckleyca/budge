import React, { Component } from 'react';
import { Container, Row, Card } from '../styles.tsx'
import { Text, View } from 'react-native';


function ListLogs(props) {
  const logs = props.logs

  if(!logs)
    return "Loading..."

  return(
    <>
      <Text>
        { `${ logs && logs.length || 'no' } items in LOG:` }
      </Text>
      <Row>
        <Text>Amount</Text>
        <Text>Description</Text>
        <Text>Categoriy</Text>
      </Row>

      {
        logs.map(log => {
          const { Type, Amount, Description, Category } = log.fields
          return(
            <Card key={log.id} left>
              <Row>
                <View color={Type === 'Expense' ? 'red' : 'green' }>
                { Amount }
                </View>
                <View heavy>{ Description }</View>
                <View>{ Category }</View>
              </Row>
            </Card>
          )
        })
      }
    </>
  )
}

export default ListLogs;
