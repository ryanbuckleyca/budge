import React from 'react';
import { Row } from '../styles';
import { Text, View } from 'react-native';
import Chart from './chart';
import dayjs from 'dayjs';
import SIZES from '../utils/sizes';
// @ts-ignore

function Card(props:any) {
  if(!props.cat || !props.log) {
    return <Text>Loading...</Text>
  }

  const { Type, Amount, Desc, Category } = props.log.fields;
  const { Icon, BudgetMonthly } = props.cat.fields;
  const d = dayjs(props.log.createdTime)
  const DisplayDate = d.format('MMM DD, HH:mm A')

  return (
    <Row style={{backgroundColor: '#191919', borderWidth: 1, borderColor: '#111', padding: 15, borderRadius: 20}}>
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
  const logs = props.logs

  if(!logs) return (<Text style={{color: 'white'}}>Loading...</Text>)

  return(
    <View style={{backgroundColor: '#222', height: '100%'}}>
      <Text style={{color: 'white'}}>
      </Text>
      <Row>
        <Text style={{color: 'white'}}>Amount</Text>
        <Text style={{color: 'white'}}>Description</Text>
        <Text style={{color: 'white'}}>Category</Text>
      </Row>
      { 
        logs.map((log:any) => {
          return (
            <Card 
              key={log.id} 
              log={log}
              cat={
                props.cats.find((cat:any) => cat.id === log.fields.Category[0])
              }
            />
          )
        })
      }
    </View>
  )
}

export default ListLogs;
