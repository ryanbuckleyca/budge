import React from 'react';
import { Row } from '../styles';
import { Text, View } from 'react-native';
import Chart from './chart';
import { Obj } from '../interfaces'
import dayjs from 'dayjs';
import SIZES from '../utils/sizes';
import { streaks } from '../utils/streaks';
import { CategorySpending } from '../utils/spending'
import { FlatList } from 'react-native-gesture-handler';

// TODO: renders twice for each cat... why?
function Card(props:any) {
  if(!props.cat || !props.log || !props.logs) {
    return <Text style={{color: 'white'}}>Loading...</Text>
  }

  const { Amount, Desc } = props.log.fields;
  const { Icon, BudgetMonthly } = props.cat.fields;
  const d = dayjs(props.log.Time)
  const DisplayDate = d.format('MMM DD, HH:mm A')
  const catSpending = CategorySpending(props.cat, props.logs)

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
      <Text style={{color: "grey", fontSize: SIZES.xsText}}>
        / {BudgetMonthly}
      </Text>
    </View>
    <View>
      <Chart limit={catSpending.limit} size={SIZES.largeText}>
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white'}}>{Icon}</Text>
        </View>
      </Chart>
    </View>
  </Row>
  )
}

function ListLogs(props:any) {
  if(!props.logs || !props.cats) 
    return <Text style={{color: 'white'}}>Loading...</Text>

  if(!Array.isArray(props.logs))
    return <Text style={{color: 'red'}}>error loading logs</Text>

  const streak = streaks(props.logs)

  return(
    <View style={{backgroundColor: '#222', height: '100%'}}>
      <Row style={{marginHorizontal: 15, marginBottom: 15}}>
        <Text style={{color: 'white', width: '100%', textAlign: 'center'}}>
          BuyNothing streak: 
          <Text style={{fontWeight: '600'}}>
            {streak.current} days ({streak.record} day record)
          </Text>
        </Text>
      </Row>
      {
      // TODO: if there is an error, props.logs is not an array
      // instead it will be an object with { error: "msg"} 
      }
      <FlatList style={{width: '100%'}}
        data={props.logs}
        renderItem={(log:Obj) => (
          <Card 
            key={log.item.id} 
            log={log.item}
            logs={props.logs}
            cat={props.cats.find((cat:any) => (
              cat.id === log.item.fields.Category[0]
            ))}
          />
        )}
      />
    </View>
  )
}

export default ListLogs;
