import React from 'react';
import Chart from './chart';
import Coins from './coins';
import { Obj } from '../interfaces/';
import SIZES from '../utils/sizes';
import {Text} from 'react-native';
import { weeksInMonth, weekOfYear, weekInfo } from '../utils/dates';
import styled, { css } from 'styled-components/native';


const CategoryItem = (props:Obj) => {
  
  const { id, fields } = props.cat.item
  const { BudgetMonthly, Frequency } = fields;

  const SpentThisMonth = 0;
  const SpentThisWeek = 0;
  // TODO: spendThisMonth and spentThisWeek 
  // should be available globally
  // same with ThisWeek and ThisMonth
  // need to use them in Logs too
  //
  // Category needs access to log
  // if this gets generated here it's going to be very slow
  // no matter where it happens it's going to be slow
  // it requires a loop, no matter what
  //
  // needs to update state so we only do this once
  // const SpentThisMonth = (cat) => {
  //   const catLogs = logs.filter((log:object) => log.cat === cat.id)
  //   const list = catLogs.filter((log:object) => log.WeekID === this.WeekID)
  //   return list.reduce((a:number, b:number) => a + b)
  // }

  const d = new Date()
  const frequency = Frequency === 'Monthly' ? "M" : "W"
  const weeksThisMonth = weeksInMonth(d.getFullYear(), d.getMonth()+1)
    .filter(wk => wk.length > 3)
  const spentThisMonth = SpentThisMonth+'/'+BudgetMonthly
  const spentThisWeek = `${SpentThisWeek}/${BudgetMonthly / weeksThisMonth.length}`
  const limit = (frequency === 'M') 
    ? eval(spentThisMonth)
    : eval(spentThisWeek)
  const fraction = frequency === 'M' 
    ? spentThisMonth
    : spentThisWeek
  const selected = id && id === props.entry.Category[0]
  const TEMPqty = Math.floor(Math.random()*7)

  return (
    <CatItem key={id} onPress={() => props.handleChange('Category', [id])}>
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
    </CatItem>
  );
};

export default CategoryItem;

const grey = css`
  color: grey
`
const flex1 = css`
  flex: 1 1 auto;
`
const row = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const Row = styled.View`
  ${row}
`
const CatItem = styled.TouchableOpacity`
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
