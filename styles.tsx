import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'

const Container = styled.View`
  color: white;
  display: flex;
  padding: 2em;
  flex-direction: column;
  background-color: #222;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  height: 100vh;
  width: 100vw;
`
const Menu = styled.View`
  display: flex;
  width: 100%;
  height: 10%;
  margin-bottom: 2em;
  flex-direction: row;
  justify-content: space-between;
`
const Icon = styled.Text`
  height: 100%;
  color: white;
  display: flex;
  flex: 1 1 20%;
  background: rgba(251, 251, 251, 0.3);
  border: 1px solid black;
  border-radius: 10px;
  font-weight: 900;
  font-size: 200%;
  align-items: center;
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
  height: 15vh;
  background: #444;
  border-radius: 50px;
  font-size: 250%;
  padding: 0 1em;
  text-align: center;
  color: white;
`
const AmountBG = styled.View`
  display: flex;
  flex-direction: ${props => props.entry.Type==='Expense' ? 'row-reverse' : 'row'};
  align-items: center;
  justify-items: space-around;
  height: 15vh;
  border-radius: 50px;
  text-align: ${props => props.entry.Type==='Expense' ? 'left' : 'right'}
  background: ${props => props.entry.Type==='Expense' ? 'red' : 'green'}
`
const PlusMinus = styled.Text`
  margin: auto;
  color: white;
  width: 20%;
  padding-right: 2%;
  font-size: 200%;
  font-weight: 700;
  text-align: center;
`
const Submit = styled.TouchableOpacity`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background: green;
  width: 100%;
  height: 15vh;
  border-radius: .5em;
  font-size: 200%;
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