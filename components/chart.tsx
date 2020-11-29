import React from 'react'
import { processColor } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'
import SIZES from '../utils/sizes'
 
export default function Chart(props) {
  const color = () => {
    if (props.limit < .5) { return '#83958d' }
    if (props.limit > .75) { return '#7c5563' }
    return '#C8AC65'
  }

  return <ProgressCircle 
    style={{ height: SIZES.icon, width: SIZES.icon }} 
    progress={props.limit} 
    progressColor={color()} 
    backgroundColor={'rgba(255, 255, 255, 0.2)'}
    strokeWidth={SIZES.icon/10}
  />
}


//react-native-svg is obviously working:

// import * as React from 'react';
// import Svg, { Circle, Rect } from 'react-native-svg';

// export default function Chart(props) {
//   return (
//     <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
//       <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
//       <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
//     </Svg>
//   );
// }