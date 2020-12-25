import { Dimensions } from 'react-native';

// set dimensions (assume phone is about 400w x 800h)
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SIZES = {
  windowWidth: windowWidth,
  windowHeight: windowHeight,
  icon: windowWidth / 7, //approx 130px
  transactionHeight: windowHeight / 8, //approx 100px
  fieldHeight: windowHeight / 11, //approx 80px
  largeText: windowHeight / 14, //approx 64px
  mediumText: windowHeight /26, //approx 32px
  smallText: windowHeight / 39, //approx 22px
  xsText: windowHeight / 50, //approx 22px
  fieldMargin: windowHeight / 55, // approx 15px
}

export default SIZES;


