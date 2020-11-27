import React from 'react';
import { ImageBackground } from 'react-native';
import {Obj, DMY} from '../interfaces/'
import styled from 'styled-components/native';


export default function Cal(props: Obj) {
  const bg = require('../assets/cal.png')
  const d = new Date();

  const date:DMY = {
    week:
      <>
        <TextCenter size={12} style={{opacity: 0.8}}>
          {new Date(d.getTime() - 864e5).getDate()}
        </TextCenter>
        <TextCenter size={18} style={{paddingLeft: 5, paddingRight: 5}}>
          {d.getDate()}
        </TextCenter>
          <TextCenter size={12} style={{opacity: 0.8}}>
          {new Date(d.getTime() + 864e5).getDate()}
        </TextCenter>
      </>,
    month:
      <TextCenter size={20}>
        {
          d.toLocaleString('US', { month: 'short' })
          .toUpperCase()
        }
      </TextCenter>,
    year:
    <TextCenter size={18} style={{paddingLeft: 5, paddingRight: 5}}>
    { d.getFullYear() }
      </TextCenter>
  } 

  return(
    <Block>
      <ImageBackground source={bg} style={{height: 60}}>
        <Row>
          { date[props.type] }
        </Row>
      </ImageBackground>
    </Block>
  )
}

const Block = styled.View`
  overflow: hidden;
  width: 60px;
  height: 60px;
`
const Row = styled(Block)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-top: 8px;
`
const TextCenter = styled.Text<Obj>`
  font-size: ${(props: Obj) => props.size}px;
  align-self: center;
  color: white;
`