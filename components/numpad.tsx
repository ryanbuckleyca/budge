import React from 'react';
import styled from 'styled-components/native';
import {Obj} from '../interfaces/';
import SIZES from '../utils/sizes';
import COLORS from '../utils/colors';
import { MaterialIcons } from "@expo/vector-icons";

export default function NumPad(props:Obj) {
  const {entry, setEntry, showNumPad, setShowNumPad} = props
  const buttons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    <MaterialIcons size={SIZES.windowWidth / 12} name="keyboard-backspace" />,
    0, <MaterialIcons size={SIZES.windowWidth / 12} name="check" style={{color:`rgb(${COLORS.green})`}} />,
  ]

  const OnPress = (item:any, index:number) => {
    if(index === 9)
      setEntry({
       ...entry, 
       Amount: entry.Amount.slice(0, -1)
      })
    else if(index === 11)
      setShowNumPad(!showNumPad)
      // TODO: set focus to next field
    else
      setEntry({
       ...entry, 
       Amount: `${entry.Amount}${item}`
      })

  }
    
  return(!showNumPad ? null :
    <KeyPad>
    {
      buttons.map((item, index) => (
        <Number 
          key={index} 
          onPress={() => OnPress(item, index)} 
          delayPressIn={0}
        >
          <Key>{ item }</Key>
        </Number>
      ))
    }
    </KeyPad>
  )
}

const KeyPad = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: auto;
`
const Number = styled.TouchableOpacity`
  width: ${SIZES.windowWidth / 3.8}px;
  height: ${SIZES.windowWidth / 3.8}px;
  border-radius: ${SIZES.windowWidth / 7}px;
  align-items: center;
  justify-content: center;
  margin: ${SIZES.windowWidth / 55}px;
  border-width: 1px;
  border-color: rgba(${COLORS.accent}, .25);
`
const Key = styled.Text`
  font-weight: 500;
  color: rgba(${COLORS.accent}, .7);
  font-size: ${SIZES.windowWidth / 12}px;
`