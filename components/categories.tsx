import { Text, View } from 'react-native';
import React from 'react';
import Chart from './chart';
import { Bg as Calendar } from './cal';
import { Obj } from '../interfaces/';
import SIZES from '../utils/sizes'
import styled from 'styled-components/native';

// sort by most used category
// or sort by name
// or sort by type (monthly vs. weekly)
// what to do about rollovers?

const getWeeksInMonth = (year: number, month: number) => { 
  const daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weeks=[];      
  const lastDate = new Date(year, month + 1, 0); 
  let start:number = 0;
  let end:number; 
  for (let i = 1; i < lastDate.getDate()+1; i++) {         
    if (daysName[Number(new Date(year, month, i).getDay())] =="Monday" || i == lastDate.getDate()) {
      end = i;
      weeks.push({
        start:start+1,
        end:end,
        length:end-start
      }); 
      start = i;           
    }
  }
  return weeks
}

console.log("getWeeksInMonth: ", getWeeksInMonth(1, 2021));  

function CategoryHeader() {
  return (
    <Header>
      <IconCol><Calendar size={SIZES.smallText+'px'} /></IconCol>
      <Flex1Col>CATEGORY</Flex1Col>
      <Flex0Col>SPENT</Flex0Col>
    </Header>
  )
}

export default function Categories(props:Obj) {

  const renderItem = ({ item }:Obj) => {
    const selected = item.id && item.id === props.entry.Category[0]
    const weeksThisMonth = getWeeksInMonth(2021, 11).filter(week => week.length > 3)
    const color = selected ? 'white' : 'grey';
    const freq = item.fields.Frequency === 'Monthly' ? "M" : "W"
    const spentThisMonth = item.fields.SpentThisMonth +'/'+ item.fields.BudgetMonthly
    const spentThisWeek = item.fields.SpentThisWeek +'/'+ (item.fields.BudgetMonth/weeksThisMonth.length)
    const limit = (freq === 'M') 
      ? item.fields.SpentThisMonth / item.fields.BudgetMonthly 
      : item.fields.SpentThisWeek / (item.fields.BudgetMonth/weeksThisMonth.length);

    return (
      <CategoryItem 
        key={item.id}
        onPress={() => props.handleChange('Category', [item.id])}
      >
        <IconCol>{freq}</IconCol>
        <CatText color={color}>{item.fields.Category}</CatText>
        <Flex0Col>
          <Text style={{padding: SIZES.smallText/2, fontSize: SIZES.smallText}}>
            {freq === 'M' ? spentThisMonth : spentThisWeek}
          </Text>
          <Chart limit={limit} size={SIZES.mediumText} />
        </Flex0Col>
      </CategoryItem>
    );
  };

  return (
    <CategoryList
      ListHeaderComponent={<CategoryHeader />}
      data={props.cats}
      renderItem={renderItem}
      extraData={props.entry}
    />
  )
}
const Flex0Col = styled.Text`
  flex: 0;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: grey;
`
const Flex1Col = styled.Text`
  flex: 1;
  text-align: left;
`
const IconCol = styled(Flex0Col)`
  flex-basis: ${SIZES.mediumText}px;
  width: ${SIZES.mediumText}px;
`
const CategoryList = styled.FlatList`
  flex: 1;
  background-color: #292929;
  margin-top: ${SIZES.fieldMargin}px;
  padding: 0 ${SIZES.fieldMargin/3}px;
  border-radius: 25px;
`
const Header = styled.Text`
  text-align: center;
  color: grey;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: ${SIZES.smallText}px;
  margin: ${SIZES.fieldMargin*.8}px;
`
const CategoryItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 ${SIZES.fieldMargin}px;
  height: ${SIZES.mediumText*1.7}px;
`
const CatText = styled.Text<Obj>`
  font-size: ${SIZES.mediumText}px;
  text-align: left;
  flex: 1;
  color: ${props => props.color};
`
