import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import SIZES from '../utils/sizes'
import COLORS from '../utils/colors'
import Clock from './clock'
import Cal from './cal'
import Chart from './chart'

export default function Menu(props:any) {
  return(
    <Row>
      <Icon onPress={() => props.navigation.navigate('Home')}>
        <Clock />
      </Icon>
      <Icon onPress={() => props.navigation.navigate('Logs')}>
        <Cal type='week' />
      </Icon>
      <Icon onPress={() => alert('Monthly logs coming soon')}>
        <Cal type='month' />
      </Icon>
      <Icon onPress={() => alert('Annual logs coming soon')}>
        <Cal type='year' />
      </Icon>
      <Icon onPress={() => alert('Budget editing coming soon')}>
        <Chart limit={0.7} size={SIZES.icon}>
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
  margin-bottom: ${SIZES.mediumText}px;
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
