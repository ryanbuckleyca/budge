import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'

const Container = styled.View`
  color: white;
  display: flex;
  padding: 32px;
  flex-direction: column;
  background-color: #222;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
const Menu = styled.View`
  display: flex;
  width: 100%;
  height: 10%;
  margin-bottom: 32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Icon = styled.Text`
  height: 100%;
  color: white;
  display: flex;
  flex: 1;
  background: rgba(251, 251, 251, 0.3);
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  font-weight: 900;
  text-align: center;
  font-size: 32px;
  line-height: 64px;
  align-items: center;
  align-self: center;
  justify-content: center;
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
const Input = styled.TextInput`
  border: 1px solid black;
  width: 100%;
  height: 18%;
  overflow: hidden;
  background: #444;
  border-radius: 50px;
  font-size: 40px;
  padding: 0 16px;
  text-align: center;
  color: white;
`
const AmountBG = styled.View`
  position: relative;
  align-items: center;
  height: 18%;
  border-radius: 50px;
  text-align: ${props => props.entry.Type==='Expense' ? 'left' : 'right'}
  background: ${props => props.entry.Type==='Expense' ? 'red' : 'green'}
`
const PlusMinus = styled.Text`
  margin: auto;
  height: 100%;
  position: absolute;
  left: ${props => props.entry.Type==='Expense' ? '0' : '80%'};
  color: white;
  width: 20%;
  padding: ${props => props.entry.Type==='Expense' ? '0 0 0 2%' : '0 2% 0 0'};
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center
  text-align: center;
`
const Submit = styled.TouchableOpacity`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background: green;
  width: 100%;
  height: 18%;
  border-radius: 8px;
  font-size: 32px;
`

export {
  Container,
  Content,
  Menu,
  Icon,
  Card,
  Row,
  Input,
  AmountBG,
  Submit,
  PlusMinus
};
