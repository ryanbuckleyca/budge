import React from 'react';
import { ImageBackground } from 'react-native';
import {Obj, DMY} from '../interfaces/'
import styled from 'styled-components/native';
import SIZES from '../utils/sizes'


export default function Cal(props: Obj) {
  const bg = require('../assets/cal.png')
  const d = new Date();

  const date:DMY = {
    week:
      <>
        <TextCenter size={SIZES.smallText*.7} style={{opacity: 0.8}}>
          {new Date(d.getTime() - 864e5).getDate()}
        </TextCenter>
        <TextCenter size={SIZES.smallText} style={{paddingLeft: SIZES.smallText/4, paddingRight: SIZES.smallText/4}}>
          {d.getDate()}
        </TextCenter>
          <TextCenter size={SIZES.smallText*.7} style={{opacity: 0.8}}>
          {new Date(d.getTime() + 864e5).getDate()}
        </TextCenter>
      </>,
    month:
      <TextCenter size={SIZES.smallText*1.2}>
        {
          d.toLocaleString('US', { month: 'short' })
          .toUpperCase()
        }
      </TextCenter>,
    year:
    <TextCenter size={SIZES.smallText} style={{paddingLeft: 5, paddingRight: 5}}>
    { d.getFullYear() }
      </TextCenter>
  } 

  return(
    <Block>
      <ImageBackground source={bg} style={{height: SIZES.largeText}}>
        <Row>
          { date[props.type] }
        </Row>
      </ImageBackground>
    </Block>
  )
}

const Block = styled.View`
  overflow: hidden;
  width: ${SIZES.largeText}px;
  height: ${SIZES.largeText}px;
`
const Row = styled(Block)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-top: ${SIZES.fieldMargin/2}px;
`
const TextCenter = styled.Text<Obj>`
  font-size: ${(props: Obj) => props.size}px;
  align-self: center;
  color: white;
`