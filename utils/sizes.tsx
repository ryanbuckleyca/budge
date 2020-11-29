import { Dimensions } from 'react-native';

// set dimensions (assume phone is about 400w x 800h)
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SIZES = {
  windowWidth: windowWidth,
  windowHeight: windowHeight,
  fieldHeight: windowHeight / 9, //approx 86px
  transactionHeight: windowHeight / 8, //approx 136px
  fieldMargin: windowHeight / 50, // approx 15px
  largeText: windowHeight / 12, //approx 64px
  mediumText: windowHeight /24, //approx 32px
  smallText: windowHeight / 36, //approx 22px
}

export default SIZES;


