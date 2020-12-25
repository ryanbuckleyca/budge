import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import SIZES from '../utils/sizes'
import COLORS from '../utils/colors'
import Clock from './clock'
import Cal from './cal'
import Chart from './chart'
import { SpentThisWeek, TotalBudget } from '../utils/spending'

export default function Menu(props:any) {

  let limit = .75
  // TODO: props are loading bad values from local storage
  // error loading from local storage:
  // [TypeError: undefined is not an object (evaluating 'a.fields.Amount')]
  if(props.cats && props.cats.length > 1 && props.logs && props.logs.length > 1) {
    console.log("props.logs in Menu: ", props.logs)
    // console.log("props.cats in Menu: ", props.cats)
    // limit = TotalBudget(props.cats) 
    // why does SpentThisWeek(props.logs) trigger local storage?
    // why does TotalBudget(props.cats) trigger local storage?
    // hard passing a logs array of objects works fine
    // so there's something wrong with the state of props here
    // but console logging doesn't seem to indicate that
    console.log("totalBudget: ", limit)
  }

  return(
    <Row>
      <Icon onPress={() => props.nav.navigate('Home')}>
        <Clock />
      </Icon>
      <Icon onPress={() => props.nav.navigate('Logs')}>
        <Cal type='week' />
      </Icon>
      <Icon onPress={() => alert('Monthly logs coming soon')}>
        <Cal type='month' />
      </Icon>
      <Icon onPress={() => alert('Annual logs coming soon')}>
        <Cal type='year' />
      </Icon>
      <Icon onPress={() => alert('Budget editing coming soon')}>
        <Chart limit={limit} size={SIZES.icon}>
          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: `rgb(${COLORS.foreground})`, fontSize: SIZES.xsText}}>75%</Text>
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
