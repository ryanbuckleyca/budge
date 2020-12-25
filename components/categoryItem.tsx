import React from 'react';
import Chart from './chart';
import Coins from './coins';
import { Obj } from '../interfaces/';
import SIZES from '../utils/sizes';
import {Text} from 'react-native';
import {CategorySpending} from '../utils/spending'
import { weeksInMonth, weekOfYear, weekInfo } from '../utils/dates';
import styled, { css } from 'styled-components/native';
import COLORS from '../utils/colors';


const CategoryItem = (props:Obj) => {
  
  const { id, fields } = props.cat.item

  const selected = id && id === props.entry.Category[0]
  const catSpending = CategorySpending(props.cat.item, props.logs)

  return (
    <CatItem key={id} onPress={() => props.handleChange('Category', [id])}>
      <Icon style={{marginRight: 5}}>
        <Coins size={SIZES.smallText+'px'} qty={fields.Popularity}/>
      </Icon>
      <CategoryName color={selected ? 'white' : `rgb(${COLORS.foreground})`}>
        {fields.Category}
      </CategoryName>
      <Row>
        <Fraction>{catSpending.fraction}</Fraction>
        <Chart limit={catSpending.limit} size={SIZES.mediumText} />
      </Row>
      <Icon>
        <Text style={{color: `rgb(${COLORS.foreground})`}}>{catSpending.frequency}</Text>
      </Icon>
    </CatItem>
  );
};

export default CategoryItem;

const grey = css`
  color: rgb(${COLORS.foreground})
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
