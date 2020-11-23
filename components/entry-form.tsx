import React, {useRef, useEffect} from 'react';
import { Animated, Text, View, RadioButton} from 'react-native';
import SlideView from './slider-view'
import { AmountBG, Container, Input,
         PlusMinus, Row, Submit } from '../styles.tsx'

function EntryForm(props) {
  const { handleChange, handleSubmit, entry, setEntry } = props;

  const fadeIn = new Animated.Value(0);
  Animated.timing(fadeIn, {
  	toValue: 1,
  	duration: 500,
  }).start()

  return(
    <>
      <AmountBG entry={entry}>
        <SlideView style={{ height: '100%', width: '80%', position: 'absolute', left: 0 }} entry={ entry }>
          <Input placeholder="Amount" />
        </SlideView>
        <PlusMinus entry={entry}
          onPress={() => entry.Type === 'Expense'
            ? setEntry({...entry, Type: 'Income'})
            : setEntry({...entry, Type: 'Expense'})
        }>
          <Animated.Text style={{opacity: fadeIn}}>{entry.Type==='Expense' ? '-' : '+'}</Animated.Text>
        </PlusMinus>
      </AmountBG>
      <Input
        style={{marginTop: 8}}
        type="text"
        placeholder="Description"
        value={ entry.Description }
        onChange={(e) => handleChange('Description', e.target.value)}
      />
      <Input
        style={{marginTop: 8}}
        type="text"
        placeholder="Category"
        value={ entry.Category }
        onChange={(e) => handleChange('Category', e.target.value)}
      />
      <Input
        style={{marginTop: 8}}
        type="text"
        placeholder="Notes"
        value={ entry.Note }
        onChange={(e) => handleChange('Notes', e.target.value)}
      />
      <Submit
        style={{marginTop: 8}}
        onPress={(e) => handleSubmit(e)}
        accessibilityLabel="Submit log"
      >
        <Text>submit</Text>
      </Submit>
    </>
  )
}

export default EntryForm;
