import React, {Component, useState, useEffect} from 'react';
import { Animated, StatusBar, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import styled from 'styled-components/native';
import SIZES from '../utils/sizes';
import COLORS from '../utils/colors';

const TICK_INTERVAL = 1000; // one second

export default class Clock extends Component {

  state = {
    index: new Animated.Value(0),
    tick: new Animated.Value(0)
  }

  _timer = 0;
  _ticker = 0;

  componentDidMount() {
    const current = dayjs();
    const diff = current.endOf('day').diff(current, 'second');
    const oneDay = 24 * 60 * 60;

    this._timer = oneDay - diff;
    this.state.tick.setValue(this._timer);
    this.state.index.setValue(this._timer - 30);

    this._animate();

    this._ticker = window.setInterval(() => {
      this._timer += 1;
      this.state.tick.setValue(this._timer);
    }, TICK_INTERVAL)
  }

  componentWillUnmount() {
    clearInterval(this._ticker);
    this._ticker = 0;
  }

  _animate = () => {
    Animated.timing(this.state.index, {
      toValue: this.state.tick,
      duration: TICK_INTERVAL / 2,
      useNativeDriver: true
    }).start()
  }

  render() {
    const {index} = this.state;
    const interpolated = {
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg']
    }
    const secondDegrees = Animated.multiply(index, 6);
    const transformSeconds = {
      transform: [{rotate: secondDegrees.interpolate(interpolated)}]
    };

    const rotateMinutes = Animated.divide(
      secondDegrees,
      new Animated.Value(60)
    );
    const transformMinutes = {
      transform: [{rotate: rotateMinutes.interpolate(interpolated)}]
    };

    const rotateHours = Animated.divide(rotateMinutes, new Animated.Value(12));
    const transformHours = {
      transform: [{rotate: rotateHours.interpolate(interpolated)}]
    };

    return (
      <Container>
        <StatusBar hidden={true} />
        <Animated.View style={[styles.mover, transformHours]}>
          <Hours />
        </Animated.View>
        <Animated.View style={[styles.mover, transformMinutes]}>
          <Minutes />
        </Animated.View>
        <Animated.View style={[styles.mover, transformSeconds]}>
          <Seconds />
        </Animated.View>
      </Container>
    )
  }
}

const Container = styled.View`
  border-radius: ${SIZES.icon/2}px;
  width: ${SIZES.icon*.95}px;
  height: ${SIZES.icon*.95}px;
  margin: auto;
  border-width: ${SIZES.icon/18}px;
  border-color: rgb(${COLORS.foreground});
  border-style: solid;
  align-items: center;
  justify-content: center;
`
const Hours = styled.View`
  background-color: rgb(${COLORS.foreground});
  height: 35%;
  margin-top: 15%;
  width: ${SIZES.icon/22}px;
  border-radius: ${SIZES.icon/22}px;
`
const Minutes = styled.View`
  background-color: rgb(${COLORS.foreground});
  height: 45%;
  margin-top: 5%;
  width: ${SIZES.icon/28}px;
  border-radius: ${SIZES.icon/28}px;
`
const Seconds = styled.View`
  background-color: rgb(${COLORS.foreground});
  opacity: 0.25;
  height: 50%;
  width: ${SIZES.icon/40}px;
  border-radius: ${SIZES.icon/20}px;
`
const styles = StyleSheet.create({
  mover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})
