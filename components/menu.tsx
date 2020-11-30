import React from 'react';
import styled from 'styled-components/native';
import SIZES from '../utils/sizes'
import Clock from './clock'
import Cal from './cal'
import Chart from './chart'

export default function Menu() {
  return(
    <Row>
      <Icon><Clock /></Icon>
      <Icon><Cal type='week' /></Icon>
      <Icon><Cal type='month' /></Icon>
      <Icon><Cal type='year' /></Icon>
      <Icon><Chart limit={0.7} size={SIZES.icon} /></Icon>
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
const Icon = styled.Text`
  height: ${SIZES.icon}px;
  display: flex;
  flex: 1;
  justify-content: center;
  margin: auto;
`
