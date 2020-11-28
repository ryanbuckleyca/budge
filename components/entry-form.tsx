import React from 'react';
import { 
  Text, 
  FlatList, 
  TouchableOpacity, 
  NativeSyntheticEvent, 
  TextInputChangeEventData
} from 'react-native';
import SIZES from '../utils/sizes'
import styled from 'styled-components/native';
import {Obj} from '../interfaces/'
import NumPad from './numpad'
import Switch from './switch'


function BottomElements(props:Obj) {
  const { 
    handleChange, 
    handleSubmit, 
    entry, 
    showNumPad,
    cats
  } = props;

  const renderItem = ({ item }: { item: Obj }) => {
    const color = (item.id && item.id === props.entry.Category[0]) ? 'white' : 'grey'
    return(
      <TouchableOpacity onPress={() => handleChange('Category', [item.id])}>
        <CatText color={color}>{item.fields.Category}</CatText>
      </TouchableOpacity>
    )
  };

  return(showNumPad ? null : <>
    <Categories>
      <CategoryHeader>Category: (Edit)</CategoryHeader>
      <FlatList
        data={cats}
        renderItem={renderItem}
        extraData={entry}
        keyExtractor={item => item.id}
      />
    </Categories>
    <Input
      placeholder="Description"
      placeholderTextColor="grey"
      value={ entry.Description }
      onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => 
        handleChange('Description', e.nativeEvent.text)}
    />
    <Input
      placeholder="Notes"
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

  return(
    <>
      <Transaction>
        <Switch 
          values={["Income", "Expense"]}
          selected={ entry.Type } 
          onPress={() => toggleType(entry.Type)} 
          style={{ width: '40%', maxWidth: `${SIZES.largeText*2}px` }}
        />
        <Price
          onPress={() => setShowNumPad(true)}
          style={{ minWidth: '60%' }}
        >
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
  height: ${SIZES.fieldHeight}px;
  border-radius: 30px;
  text-align: left;
  overflow: hidden;
`
const Categories = styled.View`
  flex: 1;
  background-color: #292929;
  margin-top: ${SIZES.fieldMargin}px;
  border-radius: 25px;
`
const CategoryHeader = styled.Text`
  text-align: center;
  color: grey;
  font-size: ${SIZES.smallText}px;
  margin: ${SIZES.fieldMargin}px;
`
const CatText = styled.Text<Obj>`
  height: 60px;
  font-size: ${SIZES.mediumText}px;
  text-align: center;
  color: ${props => props.color};
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
const Price = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Amount = styled.Text`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(1, 1, 1, 0.2);
  width: 100%;
  height: 100%;
  font-size: ${SIZES.largeText}px;
  line-height: ${SIZES.fieldHeight}px;
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
`

export default EntryForm;