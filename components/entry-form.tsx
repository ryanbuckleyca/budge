import React from 'react';
import { Animated, Text, View, FlatList, TouchableOpacity} from 'react-native';
import SlideView from './slider-view.tsx'
import styled from 'styled-components/native';
import NumPad from './numpad.tsx'

function BottomElements(props) {
  const { 
    handleChange, 
    handleSubmit, 
    entry, 
    showNumPad,
    cats
  } = props;

  console.log('entry in bottomelements is ', entry)

  const renderItem = ({ item }) => {
    console.log('entry state in renderItem is ', props.entry)
    const color = (item.id && item.id === props.entry.Category[0]) ? 'white' : 'grey'
    return(
      <TouchableOpacity onPress={() => handleChange('Category', [item.id])}>
        <CatText color={color}>{item.fields.Category}</CatText>
      </TouchableOpacity>
    )
  };

  return(showNumPad ? null : <>
    <View style={{flex: 1, backgroundColor: '#292929', marginTop: 8, borderRadius: 25 }}>
      <CategoryHeader>Category: (Edit)</CategoryHeader>
      <FlatList
        data={cats}
        renderItem={renderItem}
        extraData={entry}
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
  </>)
}

function EntryForm(props) {
  const { 
    handleChange, 
    handleSubmit, 
    entry, 
    cats,
    setEntry,
    showNumPad,
    setShowNumPad
  } = props;

  const fadeIn = new Animated.Value(0);
  Animated.timing(fadeIn, {
  	toValue: 1,
  	duration: 500,
    useNativeDriver: true
  }).start()

  return(
    <>
      <AmountBG entry={entry} onFocus={() => setShowNumPad(true)}>
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

const AmountBG = styled.View`
  position: relative;
  height: 18%;
  border-radius: 50px;
  text-align: ${props => props.entry.Type==='Expense' ? 'left' : 'right'}
  background: ${props => props.entry.Type==='Expense' ? '#7C5454' : '#455E52'}
`
const CategoryHeader = styled.Text`
  text-align: center;
  color: grey;
  font-size: 16px;
  margin: 8px;
`
const CatText = styled.Text`
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
const PlusMinus = styled.Text`
  margin: auto;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  align-content: center;
  left: ${props => props.entry.Type==='Expense' ? '0' : '80%'};
  color: white;
  width: 20%;
  padding: ${props => props.entry.Type==='Expense' ? '0 0 0 2%' : '0 2% 0 0'};
  font-size: 32px;
  font-weight: 700;
  text-align: center;
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