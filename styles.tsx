import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'
import SIZES from './utils/sizes';

const Container = styled.View`
  color: white;
  display: flex;
  padding: ${SIZES.mediumText}px;
  flex-direction: column;
  background-color: #222;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
const Content = styled.View`
  flex: 1;
  width: 100%;
`
const Card = styled.View`
  width: 100%;
  border: 1px solid rgba(1, 1, 1, 0.2);
  border-radius: 10px;
`
const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export {
  Container,
  Content,
  Card,
  Row
};
