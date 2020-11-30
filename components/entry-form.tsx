import { 
  Text, 
  NativeSyntheticEvent, 
  TextInputChangeEventData
} from 'react-native';
import React from 'react';
import SIZES from '../utils/sizes'
import styled from 'styled-components/native';
import {Obj} from '../interfaces/';
import Categories from './categories';
import NumPad from './numpad';
import Switch from './switch';

function BottomElements(props:Obj) {
  const { 
    handleChange, 
    handleSubmit, 
    entry, 
    showNumPad,
    cats
  } = props;


  console.log('cats are ', cats)

  return (showNumPad ? null : <>
    <Categories 
      cats={cats}
      entry={entry}
      handleChange={handleChange}
    />
    <Input
      placeholder="description"
      placeholderTextColor="grey"
      value={ entry.Description }
      onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => 
        handleChange('Description', e.nativeEvent.text)}
    />
    <Input
      placeholder="notes"
      placeholderTextColor="grey"
      value={ entry.Notes }
      onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => 
        handleChange('Notes', e.nativeEvent.text)}
    />
    <Submit
      onPress={(e) => handleSubmit(e)}
      accessibilityLabel="Submit log"
    >
      <Text style={{fontSize: SIZES.mediumText, color: 'rgba(255, 255, 255, 0.8)'}}>
        submit
      </Text>
    </Submit>
  </>)
}

function EntryForm(props:Obj) {
  const { 
    handleChange, 
    handleSubmit, 
    entry, 
    cats,
    setEntry,
    showNumPad,
    setShowNumPad
  } = props;

  const toggleType = (type:string) => {
    type === 'Expense'
    ? setEntry({...entry, Type: 'Income'})
    : setEntry({...entry, Type: 'Expense'})
  }

  return (
    <>
      <Transaction>
        <Switch 
          values={["Income", "Expense"]}
          selected={ entry.Type } 
          onPress={() => toggleType(entry.Type)} 
        />
        <Price onPress={() => setShowNumPad(true)}>
          <Amount>{entry.Amount || '$'}</Amount>
        </Price>
      </Transaction>

      <NumPad style={{display: showNumPad ? 'block' : 'none' }} 
        setEntry={setEntry} 
        entry={entry}  
        setShowNumPad={setShowNumPad}
        showNumPad={showNumPad}
      />

      <BottomElements
        handleChange={handleChange}
        handleSubmit={handleSubmit} 
        entry={entry}
        cats={cats}
        showNumPad={showNumPad}
       />
    </>
  )
}

const Transaction = styled.View<Obj>`
  display: flex;
  flex-direction: row;
  height: ${SIZES.transactionHeight}px;
  border-radius: 30px;
  border: 1px solid rgba(1, 1, 1, 0.2);
  text-align: left;
  overflow: hidden;
`
const Price = styled.TouchableOpacity`
  flex: 1;
  overflow: hidden;
`
const Amount = styled.Text`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(1, 1, 1, 0.1);
  width: 100%;
  height: 100%;
  font-size: ${SIZES.largeText}px;
  line-height: ${SIZES.transactionHeight}px;
  text-align: center;
  color: white;
`
const Input = styled.TextInput`
  border: 1px solid rgba(1, 1, 1, .6);
  margin-top: ${SIZES.fieldMargin}px;
  font-size: ${SIZES.mediumText}px;
  width: 100%;
  height: ${SIZES.fieldHeight}px;
  overflow: hidden;
  background: #282828;
  border-radius: 50px;
  padding: 0 ${SIZES.mediumText/2}px;
  text-align: center;
  color: white;
`
const Submit = styled.TouchableOpacity`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #507272;
  color: #2C4E3D;
  width: 100%;
  height: ${SIZES.fieldHeight}px;
  border-radius: 50px;
  font-size: ${SIZES.largeText}px;
  margin-top: ${SIZES.fieldMargin}px;
`

export default EntryForm;