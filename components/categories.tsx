import React from 'react';
import { Bg as Calendar } from './cal';
import { Obj } from '../interfaces/';
import SIZES from '../utils/sizes';
import COLORS from '../utils/colors';
import { View } from 'react-native';
import CategoryItem from './categoryItem'
import styled, { css } from 'styled-components/native';

// sort by most used category
// and/or sort by name
// and/or sort by type (monthly vs. weekly)
// what to do about rollovers?

function CategoryHeader() {
  return (
    <Header>
      <HeaderText style={{color: `rgb(${COLORS.foreground})`, width: SIZES.fieldMargin*2.2, textAlign: 'center'}}>
        # &nbsp;
      </HeaderText>
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
  return (
    <CategoriesContainer>
      <CategoryHeader />
      <CategoryList
        data={props.cats}
        extraData={props.entry}
        renderItem={(cat:object) => (
          <CategoryItem 
            logs={props.logs}
            cat={cat} 
            handleChange={props.handleChange}
            entry={props.entry} 
          /> 
        )}
      />
    </CategoriesContainer>
  )
}

const grey = css`
  color: rgb(${COLORS.foreground})
`
const row = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const flex1 = css`
  flex: 1 1 auto;
`
const Header = styled.View`
  ${row}
  ${grey}
  padding: ${SIZES.fieldMargin*.9}px 
           ${SIZES.xsText*.9}px 
           ${SIZES.fieldMargin*.8}px;
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
const HeaderText = styled.Text`
  font-size: ${SIZES.xsText}px;
  ${grey}
`
const CategoriesContainer = styled.View`
  ${flex1}
  background-color: rgb(${COLORS.midground});
  margin-top: ${SIZES.fieldMargin}px;
  padding: 0;
  border-radius: 25px;
  border: 1px solid rgba(${COLORS.canvas}, .5);
  overflow: hidden;
`
const CategoryList = styled.FlatList`
  ${flex1}
  background-color: rgb(${COLORS.midground});
`