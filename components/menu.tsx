import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import SIZES from '../utils/sizes'
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
      <Icon onPress={() => props.navigation.navigate('Logs')}>
        <Cal type='month' />
      </Icon>
      <Icon onPress={() => props.navigation.navigate('Logs')}>
        <Cal type='year' />
      </Icon>
      <Icon onPress={() => props.navigation.navigate('Logs')}>
        <Chart limit={0.7} size={SIZES.icon}>
          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: "grey", fontSize: SIZES.xsText}}>75%</Text>
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
