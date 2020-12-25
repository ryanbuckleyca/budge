import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import SIZES from '../utils/sizes'
import COLORS from '../utils/colors'
import { Obj } from '../interfaces'
 
export default function Chart(props:Obj) {
  const color = (!props.limit || props.limit <= .55)
    ? `rgb(${COLORS.green})`
    : ((props.limit > .8) 
        ? `rgb(${COLORS.red})` 
        : `rgb(${COLORS.yellow})`
      )

  return <ProgressCircle 
    style={{height: props.size, width: props.size}} 
    progress={props.limit} 
    progressColor={color} 
    animate={true}
    backgroundColor={`rgba(${COLORS.accent}, 0.2)`}
    strokeWidth={SIZES.icon/10}>
      {props.children}
    </ProgressCircle>
}