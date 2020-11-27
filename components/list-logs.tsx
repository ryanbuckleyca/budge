import React from 'react';
import { Row, Card } from '../styles.tsx'
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
                  <Text>{ Amount }</Text>
                </View>
                <View heavy><Text>{ Description }</Text></View>
                {/* TODO: Category is a controlled list */}
                {/* Categories should be part of the Budget section */}
                {/* https://www.npmjs.com/package/react-select2-native */}
                <View><Text>{ Category }</Text></View>
              </Row>
            </Card>
          )
        })
      }
    </>
  )
}

export default ListLogs;
