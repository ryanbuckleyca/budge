import React from 'react';
import { Obj } from '../interfaces';
import styled from 'styled-components/native';

const Switch = (props:Obj) => {
  return (
    <Toggle onPress={() => props.onPress()} style={{...props.style, 
      backgroundColor: props.selected === props.values[0] ? '#507272' : '#563E47'
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
  display: flex;
  padding: 0;
  position: relative;  
  bottom: 0;
`

const Type = styled.Text<Obj>`
  position: relative;
  margin: auto;
  padding-right: 20px;
  font-size: 24px;
  width: 100%;
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
  line-height: 48px;
  opacity: 0.2;
  ${props => props.selected && `
    background-color: #7C5563;
    opacity: 1;
    box-shadow: rgba(1, 1, 1, 0.25) 0px 0px 25px;
  `};
`
const On = styled(Type)`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  line-height: 48px;
  opacity: 0.2;
  ${props => props.selected && `
    background-color: #83958D;
    opacity: 1;
    box-shadow: rgba(1, 1, 1, 0.25) 0px 0px 25px;
  `};
`

export default Switch
