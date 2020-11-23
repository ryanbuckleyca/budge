import React, { useRef, useEffect } from 'react';
import { Animated, View } from 'react-native';

const SlideView = (props) => {
  const start = props.entry.Type === "Expense" ? 1 : 0
  const slider = useRef(new Animated.Value(start)).current

  Animated.timing(
   slider,
   {
     toValue: props.entry.Type === "Expense" ? 1 : 0,
     duration: 300
   }
  ).start();

  const transformStyle = {
    transform : [{
      translateX : slider.interpolate({
         inputRange: [0, 1],
         outputRange: ['0%', '25%'],
       })
    }]
  }

  return (
    <Animated.View style={{ ...props.style, ...transformStyle }}>
      {props.children}
    </Animated.View>
  );
}

export default SlideView
