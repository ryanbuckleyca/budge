import React from 'react';
import { Keyboard, Text, FlatList, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, Slider, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {Obj} from '../interfaces/'
// @ts-ignore -- remove .tsx before compiling
import NumPad from './numpad.tsx'
// @ts-ignore -- remove .tsx before compiling
import Switch from './switch.tsx'

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
      style={{marginTop: 8, height: '13%', fontSize: 32}}
      placeholder="Description"
      placeholderTextColor="grey"
      value={ entry.Description }
      onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => handleChange('Description', e.nativeEvent.text)}
    />
    <Input
    style={{marginTop: 8, height: '13%', fontSize: 32}}
      placeholder="Notes"
      placeholderTextColor="grey"
      value={ entry.Notes }
      onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => handleChange('Notes', e.nativeEvent.text)}
    />
    <Submit
      style={{marginTop: 8, height: '15%'}}
      onPress={(e) => handleSubmit(e)}
      accessibilityLabel="Submit log"
    >
      <Text style={{fontSize: 32, color: 'rgba(255, 255, 255, 0.8)'}}>submit</Text>
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

  const toggleKeyPad = () => {
    Keyboard.dismiss()
    setShowNumPad(true)
  }

  return(
    <>
      <Amount>
        <Switch 
          values={["Income", "Expense"]}
          selected={ entry.Type } 
          onPress={() => toggleType(entry.Type)} 
          style={{ width: '40%' }}
        />
        <TouchableWithoutFeedback onPress={() => toggleKeyPad()}>
        <Input
          disabled='true'
          onFocus={() => Keyboard.dismiss()}
          style={{ height: '100%', width: '60%', fontSize: 64, backgroundColor: '#191919', borderRadius: 0 }}
          placeholder="$"
          placeholderTextColor="grey"
          value={entry.Amount}
          onChange={(e:NativeSyntheticEvent<TextInputChangeEventData>) => handleChange('Amount', e.nativeEvent.text)}
        />
        </TouchableWithoutFeedback>
      </Amount>

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

const Amount = styled.View<Obj>`
  display: flex;
  flex-direction: row;
  height: 18%;
  border-radius: 30px;
  text-align: left;
  overflow: hidden;
`
const Categories = styled.View`
  flex: 1;
  background-color: #292929;
  margin-top: 8px;
  border-radius: 25px;
`
const CategoryHeader = styled.Text`
  text-align: center;
  color: grey;
  font-size: 16px;
  margin: 8px;
`
const CatText = styled.Text<Obj>`
  height: 60px;
  font-size: 32px;
  text-align: center;
  color: ${props => props.color};
`
const Input = styled.TextInput`
  border: 1px solid rgba(1, 1, 1, .6);
  width: 100%;
  height: 18%;
  overflow: hidden;
  background: #282828;
  border-radius: 50px;
  font-size: 36px;
  padding: 0 16px;
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
  height: 20%;
  border-radius: 50px;
  font-size: 32px;
`

export default EntryForm;