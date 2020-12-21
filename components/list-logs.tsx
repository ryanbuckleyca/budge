import React from 'react';
import { Row } from '../styles';
import { Text, View } from 'react-native';
import Chart from './chart';
import dayjs from 'dayjs';
import SIZES from '../utils/sizes';

console.log("XXXXXX list-logs.tsx rendered")

function Card(props:any) {
  if(!props.cat || !props.log) {
    return <Text style={{color: 'white'}}>Loading...</Text>
  }

  const { Type, Amount, Desc, Category } = props.log.fields;
  const { Icon, BudgetMonthly } = props.cat.fields;
  const d = dayjs(props.log.createdTime)
  const DisplayDate = d.format('MMM DD, HH:mm A')

  // TODO: it would be cool to show the time between cards
  // to indicate the buy nothing streak of not spending
  return (
    <Row style={{backgroundColor: '#292929', borderWidth: 1, borderColor: '#111', marginVertical: 1, padding: 15, borderRadius: 20}}>
    <View style={{flex: 1, marginHorizontal: 15}}>
      <Text style={{color: "white", fontSize: SIZES.xsText, fontWeight: '700'}}>
        {Desc}
      </Text>
      <Text style={{color: "grey", fontSize: SIZES.xsText}}>
        {DisplayDate}
      </Text>
    </View>
    <View style={{marginRight: 15}}>
      <Text style={{textAlign: 'right', color: "white", fontSize: SIZES.xsText}}>
        {'$'+Math.ceil(Amount)}
      </Text>
    </View>
    <View>
      <Chart limit={.8} size={SIZES.largeText}>
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white'}}>{Icon}</Text>
          <Text style={{color: "grey", fontSize: SIZES.xsText}}>
            /{BudgetMonthly}
          </Text>
        </View>
      </Chart>
    </View>
  </Row>
  )
}

function ListLogs(props:any) {

  console.log('logs in listLogs is: ', props.logs)

  if(!props.logs || !props.cats) 
    return <Text style={{color: 'white'}}>Loading...</Text>

  if(!Array.isArray(props.logs))
    return <Text style={{color: 'red'}}>error loading logs</Text>


  return(
    <View style={{backgroundColor: '#222', height: '100%'}}>
      <Row style={{marginHorizontal: 15, marginBottom: 15}}>
        <Text style={{color: 'white', width: '100%', textAlign: 'center'}}>
          BuyNothing streak: 
          <Text style={{fontWeight: '600'}}>4 days (45 record)</Text>
        </Text>
      </Row>
      { // TODO: if there is an error, props.logs is not an array
        // instead it will be an objects with { error: "msg"}
        props.logs.map((log:any) => <Card 
          key={log.id} 
          log={log}
          cat={
            props.cats.find(
              (cat:any) => cat.id === log.fields.Category[0]
            )
          }
        />)
      }
    </View>
  )
}

export default ListLogs;
