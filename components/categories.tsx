import React from 'react';
import Chart from './chart';
import { Bg as Calendar } from './cal';
import Coins from './coins';
import { Obj } from '../interfaces/';
import SIZES from '../utils/sizes';
import {Text} from 'react-native';
import { weeksInMonth, weekOfYear, weekInfo } from '../utils/dates';
import styled, { css } from 'styled-components/native';

// sort by most used category
// and/or sort by name
// and/or sort by type (monthly vs. weekly)
// what to do about rollovers?

console.log("weeksInMonth: ", weeksInMonth(2020, 12));  
console.log("weekOfYear: ", weekOfYear());  
console.log("weekInfo: ", weekInfo());  

function CategoryHeader() {
  return (
    <Header>
      <Icon style={{marginRight: 5}}>
        <Text style={{color: 'grey'}}>QTY</Text>
      </Icon>
      <HeaderText style={{flex: 1}}>
        CATEGORY
      </HeaderText>
      <HeaderText>
        SPENDING
      </HeaderText>
      <Icon>
        <Calendar size={SIZES.xsText+'px'} />
      </Icon>
    </Header>
  )
}

export default function Categories(props:Obj) {
  const { handleChange } = props

  const renderItem = ({ item }:Obj) => {
    const { id, fields } = item
    const { SpentThisMonth, SpentThisWeek, BudgetMonthly, Frequency } = fields;
    // can these easily be calculated on Airtable side?
    // if so, do it there
    // MonthNum and WeekNum can't be determined by AT
    // so these should be calculated here and pushed with data
    // also:
    // spendThisMonth and spentThisWeek 
    // should be available globally
    // need to use them in Logs too
    const d = new Date()
    const frequency = Frequency === 'Monthly' ? "M" : "W"
    const weeksThisMonth = weeksInMonth(d.getFullYear(), d.getMonth()+1)
      .filter(wk => wk.length > 3)
    const spentThisMonth = SpentThisMonth+'/'+BudgetMonthly
    const spentThisWeek = SpentThisWeek+'/'+(BudgetMonthly/weeksThisMonth.length)
    const limit = (frequency === 'M') 
      ? eval(spentThisMonth)
      : eval(spentThisWeek)
    const fraction = frequency === 'M' 
      ? spentThisMonth
      : spentThisWeek
    const selected = id && id === props.entry.Category[0]
    const TEMPqty = Math.floor(Math.random()*7)

    return (
      <CategoryItem key={id} onPress={() => handleChange('Category', [id])}>
        <Icon style={{marginRight: 5}}>
          <Coins size={SIZES.smallText+'px'} qty={TEMPqty}/>
        </Icon>
        <CategoryName color={selected ? 'white' : 'grey'}>
          {fields.Category}
        </CategoryName>
        <Row>
          <Fraction>{fraction}</Fraction>
          <Chart limit={limit} size={SIZES.mediumText} />
        </Row>
        <Icon>
          <Text style={{color: 'grey'}}>{frequency}</Text>
        </Icon>
      </CategoryItem>
    );
  };

  return (
    <CategoriesContainer>
      <CategoryHeader />
      <CategoryList
        data={props.cats}
        extraData={props.entry}
        renderItem={renderItem}
      />
    </CategoriesContainer>
  )
}

const grey = css`
  color: grey
`;
const row = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const flex0 = css`
  flex: 0 0 auto;
`;
const flex1 = css`
  flex: 1 1 auto;
`;

const Header = styled.View`
  ${row}
  ${grey}
  padding: ${SIZES.fieldMargin}px 
           ${SIZES.xsText}px 
           ${SIZES.fieldMargin/2}px;
`
const Icon = styled.View`
  ${grey}
  width: ${SIZES.fieldMargin*2}px;
  height: auto;
  font-size: ${SIZES.smallText}px;
  text-align: center;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Row = styled.View`
  ${row}
`
const HeaderText = styled.Text`
  font-size: ${SIZES.xsText}px;
  ${grey}
`
const CategoriesContainer = styled.View`
  ${flex1}
  background-color: #292929;
  margin-top: ${SIZES.fieldMargin}px;
  padding: 0 ${SIZES.fieldMargin/3}px;
  border-radius: 25px;
  overflow: hidden;
`
const CategoryList = styled.FlatList`
  ${flex1}
  background-color: #292929;
`
const CategoryItem = styled.TouchableOpacity`
  ${row}
  padding: 0 ${SIZES.xsText}px;
  height: ${SIZES.mediumText*1.6}px;
`
const CategoryName = styled.Text<Obj>`
  ${flex1}
  font-size: ${SIZES.mediumText*.8}px;
  text-align: left;
  color: ${props => props.color};
`
const Fraction = styled.Text`
  padding: ${SIZES.smallText/3}px;
  font-size: ${SIZES.smallText}px;
  ${grey}
`
