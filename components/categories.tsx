import React from 'react';
import Chart from './chart';
import { Bg as Calendar } from './cal';
import Coins from './coins';
import { Obj } from '../interfaces/';
import SIZES from '../utils/sizes'
import styled, { css } from 'styled-components/native';

// sort by most used category
// or sort by name
// or sort by type (monthly vs. weekly)
// what to do about rollovers?

const weeksInMonth = (year: number, month: number) => { 
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

console.log("weeksInMonth: ", weeksInMonth(1, 2021));  

function CategoryHeader() {
  return (
    <Header>
      <Icon>
        <Coins size={SIZES.smallText+'px'} qty={"medium"} />
      </Icon>
      <HeaderText style={{flex: 1}}>
        CATEGORY
      </HeaderText>
      <HeaderText style={{paddingHorizontal: 10}}>
        SPENT
      </HeaderText>
      <Icon>
        <Calendar size={SIZES.smallText+'px'} />
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
    const TEMPqty = ['low', 'medium', 'high'][Math.floor(Math.random()*3)]
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
           ${SIZES.smallText/2}px 
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
  font-size: ${SIZES.smallText}px;
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
  padding: 0 ${SIZES.smallText/2}px;
  height: ${SIZES.mediumText*1.6}px;
`
const CategoryName = styled.Text<Obj>`
  ${flex1}
  font-size: ${SIZES.mediumText}px;
  text-align: left;
  color: ${props => props.color};
`
const Fraction = styled.Text`
  padding: ${SIZES.smallText/3}px;
  font-size: ${SIZES.smallText}px;
  ${grey}
`
