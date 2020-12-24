import { Dimensions } from 'react-native';

// set dimensions (assume phone is about 400w x 800h)
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SIZES = {
  windowWidth: windowWidth,
  windowHeight: windowHeight,
  icon: windowWidth / 7, //approx 130px
  transactionHeight: windowHeight / 8, //approx 100px
  fieldHeight: windowHeight / 10, //approx 80px
  largeText: windowHeight / 14, //approx 64px
  mediumText: windowHeight /26, //approx 32px
  smallText: windowHeight / 40, //approx 22px
  fieldMargin: windowHeight / 50, // approx 15px
  xsText: windowHeight / 56, //approx 22px
}

export default SIZES;


