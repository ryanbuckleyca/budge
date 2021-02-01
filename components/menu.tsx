import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import SIZES from '../utils/sizes'
import COLORS from '../utils/colors'
import Clock from './clock'
import Cal from './cal'
import Chart from './chart'
import { SpentThisPeriod, TotalBudget } from '../utils/spending'

export default function Menu(props:any) {

  const { cats, logs, nav } = props

    if(!cats || !logs || cats.length < 2 || logs.length < 2)
      return <Text>error</Text>

    const limit =
      SpentThisPeriod('week', logs) /
      TotalBudget(cats, 'Weekly')

    return(
    <Row>
      <Icon onPress={() => nav.navigate('Home')}>
        <Clock />
      </Icon>
      <Icon onPress={() => nav.navigate('Logs')}>
        <Cal type='week' />
      </Icon>
      <Icon onPress={() => alert('Monthly logs coming soon')}>
        <Cal type='month' />
      </Icon>
      <Icon onPress={() => alert('Annual logs coming soon')}>
        <Cal type='year' />
      </Icon>
      <Icon onPress={() => alert('Budget editing coming soon')}>
        <Chart limit={(limit)} size={SIZES.icon}>
          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: `rgb(${COLORS.foreground})`, fontSize: SIZES.xsText}}>{Math.ceil(limit*100)}%</Text>
          </View>
        </Chart>
      </Icon>
    </Row>
  )
}

const Row = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${SIZES.icon}px;
  margin-bottom: ${SIZES.smallText}px;
  align-items: center;
  justify-content: space-between;
`
const Icon = styled.TouchableOpacity`
  height: ${SIZES.icon}px;
  display: flex;
  flex: 1;
  justify-content: center;
  margin: auto;
`
