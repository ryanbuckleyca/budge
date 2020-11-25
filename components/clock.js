import React, {Component} from 'react';
import { Animated, StatusBar, StyleSheet, Dimensions, View } from 'react-native';
import dayjs from 'dayjs';

const TICK_INTERVAL = 1000;

export default class Clock extends Component {

  state = {
    index: new Animated.Value(0),
    tick: new Animated.Value(0)
  }

  _timer = 0;
  _ticker = null;

  componentDidMount() {
    const current = dayjs();
    const diff = current.endOf('day').diff(current, 'seconds');
    const oneDay = 24 * 60 * 60;

    this._timer = oneDay - diff;
    this.state.tick.setValue(this._timer);
    this.state.index.setValue(this._timer - 30);

    this._animate();

    this._ticker = setInterval(() => {
      this._timer += 1;
      this.state.tick.setValue(this._timer);
    }, TICK_INTERVAL)
  }

  componentWillUnmount() {
    clearInterval(this._ticker);
    this._ticker = null;
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
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Animated.View style={[styles.mover, transformHours]}>
          <View style={styles.hours} />
        </Animated.View>
        <Animated.View style={[styles.mover, transformMinutes]}>
          <View style={styles.minutes} />
        </Animated.View>
        <Animated.View style={[styles.mover, transformSeconds]}>
          <View style={styles.seconds} />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    margin: 'auto 0',
    background: 'none',
    border: '4px solid white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  hours: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: '35%',
    marginTop: '15%',
    width: 4,
    borderRadius: 5
  },
  minutes: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: '45%',
    marginTop: '5%',
    width: 4,
    borderRadius: 5
  },
  seconds: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: '50%',
    width: 2,
    borderRadius: 5
  }
})
