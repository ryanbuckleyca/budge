import React, {Component} from 'react';
import { Animated, StatusBar, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import styled from 'styled-components/native';


const TICK_INTERVAL = 1000;

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
  border-radius: 30px;
  width: 60px;
  height: 60px;
  margin: auto 0;
  border: 4px solid white;
  align-items: center;
  justify-content: center;
`
const Hours = styled.View`
  background-color: rgba(255, 255, 255, 1);
  height: 35%;
  margin-top: 15%;
  width: 4px;
  border-radius: 5px;
`
const Minutes = styled.View`
  background-color: rgba(255, 255, 255, 1);
  height: 45%;
  margin-top: 5%;
  width: 4px;
  border-radius: 5px;
`
const Seconds = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  height: 50%;
  width: 2px;
  border-radius: 5px;
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
