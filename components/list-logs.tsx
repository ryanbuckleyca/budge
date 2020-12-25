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
import COLORS from '../utils/colors';

// TODO: renders twice for each cat... why?
function Card(props:any) {
  if(!props.cat || !props.log || !props.logs) {
    return <Text style={{color: `rgb(${COLORS.accent})`}}>Loading...</Text>
  }

  const { Amount, Vendor } = props.log.fields;
  const { Icon, BudgetMonthly } = props.cat.fields;
  const d = dayjs(props.log.Time)
  const DisplayDate = d.format('MMM DD, HH:mm A')
  const catSpending = CategorySpending(props.cat, props.logs)

  // TODO: it would be cool to show the time between cards
  // to indicate the buy nothing streak of not spending
  return (
    <Row style={{backgroundColor: `rgb(${COLORS.midground})`, borderWidth: 1, borderColor: `rgba(${COLORS.canvas}, .7)`, marginVertical: 1, padding: 15, borderRadius: 20}}>
    <View style={{flex: 1, marginHorizontal: 15}}>
      <Text style={{color: `rgb(${COLORS.accent})`, fontSize: SIZES.xsText, fontWeight: '700'}}>
        {Vendor}
      </Text>
      <Text style={{color: `rgb(${COLORS.foreground})`, fontSize: SIZES.xsText}}>
        {DisplayDate}
      </Text>
    </View>
    <View style={{marginRight: 15}}>
      <Text style={{textAlign: 'right', color: `rgb(${COLORS.accent})`, fontSize: SIZES.xsText}}>
        {'$'+Math.ceil(Amount)}
      </Text>
      <Text style={{color: `rgb(${COLORS.foreground})`, fontSize: SIZES.xsText}}>
        / {BudgetMonthly}
      </Text>
    </View>
    <View>
      <Chart limit={catSpending.limit} size={SIZES.largeText}>
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: `rgb(${COLORS.accent})`}}>{Icon}</Text>
        </View>
      </Chart>
    </View>
  </Row>
  )
}

function ListLogs(props:any) {
  if(!props.logs || !props.cats) 
    return <Text style={{color: `rgb(${COLORS.accent})`}}>Loading...</Text>

  if(!Array.isArray(props.logs))
    return <Text style={{color: `rgb(${COLORS.red})`}}>error loading logs</Text>

  const streak = streaks(props.logs)

  return(
    <View style={{backgroundColor: `rgb(${COLORS.background})`, height: '100%'}}>
      <Row style={{marginHorizontal: 15, marginBottom: 15}}>
        <Text style={{color: `rgb(${COLORS.accent})`, width: '100%', textAlign: 'center'}}>
          BuyNothing streak: &nbsp; 
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
