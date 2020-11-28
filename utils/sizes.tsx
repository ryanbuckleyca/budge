import { Dimensions } from 'react-native';

// set dimensions (assume phone is about 400w x 800h)
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SIZES = {
  windowWidth: windowWidth,
  windowHeight: windowHeight,
  fieldHeight: windowHeight / 9, //approx 86px on iPhone 11
  fieldMargin: windowHeight / 50, // approx 15px on iPhone 11
  largeText: windowHeight / 12, //approx 64px on iPhone 11
  mediumText: windowHeight /24, //approx 32px on iPhone 11
  smallText: windowHeight / 36, //approx 22px on iPhone 11
}

export default SIZES;


