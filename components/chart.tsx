import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import SIZES from '../utils/sizes'
import { Obj } from '../interfaces'
 
export default function Chart(props:Obj) {
  const color = (props.limit < .5)
    ? '#83958d'
    : ((props.limit > .75) ? '#7c5563' : '#C8AC65')

  return <ProgressCircle 
    style={{height: props.size, width: props.size}} 
    progress={props.limit} 
    progressColor={color} 
    animate={true}
    backgroundColor={'rgba(255, 255, 255, 0.2)'}
    strokeWidth={SIZES.icon/10}>
      {props.children}
    </ProgressCircle>
}