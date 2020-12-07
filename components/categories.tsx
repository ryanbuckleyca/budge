import React from 'react';
import Chart from './chart';
import { Bg as Calendar } from './cal';
import Coins from './coins';
import { Obj } from '../interfaces/';
import SIZES from '../utils/sizes'
import { weeksInMonth, weekOfYear } from '../utils/dates';
import styled, { css } from 'styled-components/native';

// sort by most used category
// or sort by name
// or sort by type (monthly vs. weekly)
// what to do about rollovers?


console.log("weeksInMonth: ", weeksInMonth(1, 2021));  
console.log("weeksOfYear: ", weekOfYear());  

function CategoryHeader() {
  return (
    <Header>
      <Icon>
        <Coins size={SIZES.xsText+'px'} rating={3} />
      </Icon>
      <HeaderText style={{flex: 1}}>
        CATEGORY
      </HeaderText>
      <HeaderText style={{paddingHorizontal: 10}}>
        SPENT
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
    
    const frequency = Frequency === 'Monthly' ? "M" : "W"
    const weeksThisMonth = weeksInMonth(2021, 11).filter(wk => wk.length > 3)
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
        <Icon>
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
          {frequency}
        </Icon>
      </CategoryItem>
    );
  };

  return (
    <CategoryList
      ListHeaderComponent={<CategoryHeader />}
      data={props.cats}
      extraData={props.entry}
      renderItem={renderItem}
    />
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
const Icon = styled.Text`
  ${flex0}
  ${grey}
  width: ${SIZES.fieldMargin*2}px
  font-size: ${SIZES.smallText}px
  text-align: center;
`
const Row = styled.View`
  ${row}
`
const HeaderText = styled.Text`
  font-size: ${SIZES.xsText}px;
  ${grey}
`
const CategoryList = styled.FlatList`
  ${flex1}
  background-color: #292929;
  margin-top: ${SIZES.fieldMargin}px;
  padding: 0 ${SIZES.fieldMargin/3}px;
  border-radius: 25px;
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
