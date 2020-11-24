import React, {useRef, useEffect} from 'react';
import { Animated, Item, Text, View, RadioButton, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import SlideView from './slider-view'
import { AmountBG, Container, Input,
         PlusMinus, Submit } from '../styles.tsx'

function EntryForm(props) {
  const { handleChange, handleSubmit, entry, setEntry } = props;

  console.log('cats: ', props.cats)

  const fadeIn = new Animated.Value(0);
  Animated.timing(fadeIn, {
  	toValue: 1,
  	duration: 500,
    useNativeDriver: true
  }).start()

  const renderItem = ({ item }) => {
    console.log('item prop in renderItem is ', item)
    const color = (item.id && item.id === props.entry.Category[0]) ? 'white' : 'grey'
    return(
      <TouchableOpacity onPress={() => handleChange('Category', [item.id])}>
        <Text style={{height:50, fontSize: 32, textAlign: 'center', color: color}}>{item.fields.Category}</Text>
      </TouchableOpacity>
    )
  };

  return(
    <>
      <AmountBG entry={entry}>
        <SlideView style={{ height: '100%', width: '80%', position: 'absolute', left: 0 }} entry={ entry }>
          <Input
            style={{ height: '100%', left: entry.Type==='Expense' ? '20%' : '0%' }}
            placeholder="Amount"
            onChange={(e) => handleChange('Amount', e.target.value)} />
        </SlideView>
        <PlusMinus entry={entry}
          onPress={() => entry.Type === 'Expense'
            ? setEntry({...entry, Type: 'Income'})
            : setEntry({...entry, Type: 'Expense'})
        }>
          <Animated.Text style={{opacity: fadeIn, lineHeight: '100%'}}>{entry.Type==='Expense' ? '-' : '+'}</Animated.Text>
        </PlusMinus>
      </AmountBG>
      <Text style={{textAlign: 'center', color: 'white', marginTop: 8}}>Categories: (Edit)</Text>
      <FlatList
        height="15%"
        data={props.cats}
        renderItem={renderItem}
        extraData={props.entry.Category}
        keyExtractor={item => item.id}
      />
      <Input
        style={{marginTop: 8, height: '10%'}}
        type="text"
        placeholder="Description"
        value={ entry.Description }
        onChange={(e) => handleChange('Description', e.target.value)}
      />
      <Input
        style={{marginTop: 8, height: '10%'}}
        type="text"
        placeholder="Notes"
        value={ entry.Note }
        onChange={(e) => handleChange('Notes', e.target.value)}
      />
      <Submit
        style={{marginTop: 8, height: '10%'}}
        onPress={(e) => handleSubmit(e)}
        accessibilityLabel="Submit log"
      >
        <Text>submit</Text>
      </Submit>
    </>
  )
}

export default EntryForm;
