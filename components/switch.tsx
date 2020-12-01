import React from 'react';
import { Obj } from '../interfaces';
import styled from 'styled-components/native';
import SIZES from '../utils/sizes';

const Switch = (props:Obj) => {
  return (
    <Toggle 
    onPress={() => props.onPress()} 
    style={{
      ...props.style, 
      backgroundColor: 
        props.selected === props.values[0] 
        ? '#507272' 
        : '#563E47'
    }}>
      <On selected={ props.values[0] === props.selected }>
        {props.values[0]}:
      </On>
      <Off selected={ props.values[1] === props.selected }>
        {props.values[1]}:
      </Off>
    </Toggle>
  );
}

const Toggle = styled.TouchableOpacity`
  height: 100%;
  flex: 0 0 auto;
  display: flex;
  padding: 0;
  position: relative;  
  bottom: 0;
`
const Type = styled.Text<Obj>`
  position: relative;
  margin: auto;
  padding: 0 ${SIZES.xsText}px;
  font-size: ${SIZES.xsText}px;
  color: white;
  font-weight: 700;
  text-align: right;
`
const Off = styled(Type)`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  line-height: ${SIZES.fieldHeight/2}px;
  opacity: 0.1;
  ${props => props.selected && `
    background-color: #7C5563;
    opacity: 1;
  `};
`
const On = styled(Type)`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  line-height: ${SIZES.fieldHeight/2}px;
  opacity: 0.1;
  ${props => props.selected && `
    background-color: #83958D;
    opacity: 1;
  `};
`

export default Switch
