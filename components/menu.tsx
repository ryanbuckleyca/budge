import React from 'react';
import styled from 'styled-components/native';
import { PieChart } from 'react-minimal-pie-chart';
import Clock from './clock'
import Cal from './cal'

export default function Menu() {
  return(
    <Row>
      <Icon><Clock /></Icon>
      <Icon><Cal type='week' /></Icon>
      <Icon><Cal type='month' /></Icon>
      <Icon><Cal type='year' /></Icon>
      <Icon>
        <PieChart 
          data={[{ value: 82, color: '#92727D' }]}
          totalValue={100}
          lineWidth={20}
          rounded
          label={({ dataEntry }) => `${dataEntry.value}%`}
          labelStyle={{
            fontSize: '28px',
            fontFamily: 'sans-serif',
            fill: '#92727D',
          }}
          labelPosition={0}          
        />
      </Icon>
    </Row>
  )
}

const Row = styled.View`
  display: flex;
  width: 100%;
  height: 10%;
  margin-bottom: 32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Icon = styled.Text`
  height: 70px;
  color: white;
  display: flex;
  flex: 1;
  margin: 0 auto;
  padding: 5px 0;
  font-weight: 900;
  text-align: center;
  font-size: 32px;
  line-height: 100%;
  align-items: center;
  align-self: center;
  justify-content: center;
`
