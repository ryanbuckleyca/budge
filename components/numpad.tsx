import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from "@expo/vector-icons";
const windowWidth = Dimensions.get('window').width;

export default function NumPad(props) {
  const {entry, setEntry, showNumPad, setShowNumPad} = props
  const buttons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    <MaterialIcons name="keyboard-backspace" size={24} />,
    0, <MaterialIcons name="check" size={24} style={{color:'#507272'}} />,
  ]

  const OnPress = (item, index) => {
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
    {buttons.map((item, index) => {
      return (
        <Number 
          key={index} 
          onPress={() => OnPress(item, index)} 
          delayPressIn={0}
        >
          <Key>{ item }</Key>
        </Number>
      )
    })}
    </KeyPad>
  )
}


const KeyPad = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
`;

const Number = styled.TouchableOpacity`
  width: ${windowWidth / 4.5}px;
  height: ${windowWidth / 4.5}px;
  border-radius: ${windowWidth / 9}px;
  align-items: center;
  justify-content: center;
  margin: 8px;
  border-width: 1px;
  border-color: #ffffff20;
`;
const Key = styled.Text`
  font-weight: 500;
  color: #ffffff80;
  font-size: ${windowWidth / 12}px;
`;