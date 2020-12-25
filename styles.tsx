import styled from 'styled-components/native'
import SIZES from './utils/sizes';
import COLORS from './utils/colors';

const Container = styled.View`
  color: rgb(${COLORS.accent});
  display: flex;
  padding: ${SIZES.xsText}px;
  padding-top: ${SIZES.largeText}px;
  flex-direction: column;
  background-color: rgb(${COLORS.background});
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
  border: 1px solid rgba(${COLORS.canvas}, 0.2);
  border-radius: 10px;
`
const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export {
  Container,
  Content,
  Card,
  Row
};
