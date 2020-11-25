import React, { JSXElementConstructor } from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';

export default function Cal(props: { type: string }) {
  const bg = require('../assets/cal.png')
  const d = new Date();

  const date = {
    week:
      <>
        <Text style={styles.textSm}>
          {new Date(d.getTime() - 864e5).getDate()}
        </Text>
        <Text style={styles.textMd}>
          {d.getDate()}
        </Text>
          <Text style={styles.textSm}>
          {new Date(d.getTime() + 864e5).getDate()}
        </Text>
      </>,
    month:
      <Text style={styles.textLg}>
        {
          d.toLocaleString('US', { month: 'short' })
          .toUpperCase()
        }
      </Text>,
    year:
      <Text style={[styles.textMd]}>
        { d.getFullYear() }
      </Text>
  } 

  return(
    <View style={styles.fill}>
      <ImageBackground source={bg} style={styles.fill}>
        <View style={[styles.row, styles.fill]}>
          { date[props.type] }
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    width: '100%', 
    height: '100%'
  },
  row: {
    display: 'flex', 
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '8%'
  },
  textSm: {
    fontSize: 12,
    alignSelf: 'center',
    opacity: 0.8
  },
  textMd: {
    fontSize: 18,
    alignSelf: 'center',
    paddingHorizontal: 5
  },
  textLg: {
    fontSize: 20,
    alignSelf: 'center'
  }
})