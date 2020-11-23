import React from 'react';
import { Text, View, RadioButton} from 'react-native';
import SlideView from './slider-view'
import { Animated, AmountBG, Container, Input,
         InputSlider, PlusMinus, Row, Submit } from '../styles.tsx'


function EntryForm(props) {
  const { handleChange, handleSubmit, entry, setEntry } = props;

  return(
    <>
      <View style={{ background: 'white', position: 'relative', height: '15vh' }}>
        <SlideView style={{ height: '100%', width: '80%', position: 'absolute' }} entry={ entry }>
          <Input style={{ height: '100%', width: '100%' }} placeholder="SliderView" />
        </SlideView>
      </View>
      <AmountBG entry={entry}>
        <InputSlider
          style={{left: entry.Type==='Expense'?'20%':'0'}}
          type="number"
          placeholder="Amount"
          value={ entry.Amount }
          onChange={(e) => handleChange('Amount', e.target.value)}
        />
        <PlusMinus
          entry={entry}
          onPress={() => entry.Type === 'Expense'
            ? setEntry({...entry, Type: 'Income'})
            : setEntry({...entry, Type: 'Expense'})
        }>
          {entry.Type==='Expense' ? '-' : '+'}
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
