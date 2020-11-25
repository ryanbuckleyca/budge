import React from 'react';
import { Animated, Text, View, FlatList, TouchableOpacity} from 'react-native';
import SlideView from './slider-view.tsx'
import { AmountBG, Input, PlusMinus, Submit } from '../styles.tsx'

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
    const color = (item.id && item.id === props.entry.Category[0]) ? 'white' : 'grey'
    return(
      <TouchableOpacity onPress={() => handleChange('Category', [item.id])}>
        <Text style={{height:60, fontSize: 32, textAlign: 'center', color: color}}>{item.fields.Category}</Text>
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
            placeholderTextColor="grey"
            value={entry.Amount}
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
      <View style={{flex: 1}}>
        <Text style={{textAlign: 'center', color: 'white', margin: 16, fontSize: 16}}>Category: (Edit)</Text>
        <FlatList
          data={props.cats}
          renderItem={renderItem}
          extraData={props.entry.Category}
          keyExtractor={item => item.id}
        />
      </View>
      <Input
        style={{marginTop: 8, height: '13%', fontSize: 32}}
        type="text"
        placeholder="Description"
        placeholderTextColor="grey"
        value={ entry.Description }
        onChange={(e) => handleChange('Description', e.target.value)}
      />
      <Input
      style={{marginTop: 8, height: '13%', fontSize: 32}}
        type="text"
        placeholder="Notes"
        placeholderTextColor="grey"
        value={ entry.Note }
        onChange={(e) => handleChange('Notes', e.target.value)}
      />
      <Submit
        style={{marginTop: 8, height: '15%'}}
        onPress={(e) => handleSubmit(e)}
        accessibilityLabel="Submit log"
      >
        <Text style={{fontSize: 32, color: 'rgba(255, 255, 255, 0.8)'}}>submit</Text>
      </Submit>
    </>
  )
}

export default EntryForm;
