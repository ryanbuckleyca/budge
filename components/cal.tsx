import React from 'react';
import Svg, {G, Path, ClipPath, Rect, Defs} from 'react-native-svg';
import { View } from 'react-native';
import {Obj, DMY} from '../interfaces/'
import styled from 'styled-components/native';
import SIZES from '../utils/sizes'
import dayjs from 'dayjs';

export default function Cal(props: Obj) {
  const d = new Date();

  const date:DMY = {
    week:
      <>
        <TextCenter size={SIZES.icon*.3} style={{opacity: 0.6}}>
          {new Date(d.getTime() - 864e5).getDate()}
        </TextCenter>
        <TextCenter size={SIZES.icon*.33} style={{paddingLeft: SIZES.icon/16, paddingRight: SIZES.icon/16}}>
          {dayjs(d).format('DD')}
        </TextCenter>
          <TextCenter size={SIZES.icon*.3} style={{opacity: 0.6}}>
          {new Date(d.getTime() + 864e5).getDate()}
        </TextCenter>
      </>,
    month:
      <TextCenter size={SIZES.icon*.33}>
        { dayjs(d).format('MMM').toUpperCase() }
      </TextCenter>,
    year:
      <TextCenter size={SIZES.icon*.33}>
        { d.getFullYear() }
      </TextCenter>
  } 

  return(
    <Block>
      <Row>
        { date[props.type] }
      </Row>
      <View style={{position: 'absolute'}}>
        <Bg size={SIZES.icon}/>
      </View>
    </Block>
  )
}


export function Bg(props: Obj) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 400 400" fill="none">
      <G clipPath="url(#clip0)">
        <Path fill="grey" d="M350 30.15H320C320 22.1537 316.839 14.485 311.213 8.83073C305.587 3.17651 297.956 0 290 0C282.044 0 274.413 3.17651 268.787 8.83073C263.161 14.485 260 22.1537 260 30.15H140C140 22.1537 136.839 14.485 131.213 8.83073C125.587 3.17651 117.956 0 110 0C102.044 0 94.4129 3.17651 88.7868 8.83073C83.1607 14.485 80 22.1537 80 30.15H50C36.7392 30.15 24.0215 35.4442 14.6447 44.8679C5.26784 54.2916 0 67.0729 0 80.4L0 336.675C0 354 6.8482 370.616 19.0381 382.867C31.2279 395.118 47.7609 402 65 402H335C352.239 402 368.772 395.118 380.962 382.867C393.152 370.616 400 354 400 336.675V80.4C400 67.0729 394.732 54.2916 385.355 44.8679C375.978 35.4442 363.261 30.15 350 30.15ZM280 30.15C280 27.4846 281.054 24.9283 282.929 23.0436C284.804 21.1588 287.348 20.1 290 20.1C292.652 20.1 295.196 21.1588 297.071 23.0436C298.946 24.9283 300 27.4846 300 30.15V50.25C300 52.9154 298.946 55.4717 297.071 57.3564C295.196 59.2412 292.652 60.3 290 60.3C287.348 60.3 284.804 59.2412 282.929 57.3564C281.054 55.4717 280 52.9154 280 50.25V30.15ZM100 30.15C100 27.4846 101.054 24.9283 102.929 23.0436C104.804 21.1588 107.348 20.1 110 20.1C112.652 20.1 115.196 21.1588 117.071 23.0436C118.946 24.9283 120 27.4846 120 30.15V50.25C120 52.9154 118.946 55.4717 117.071 57.3564C115.196 59.2412 112.652 60.3 110 60.3C107.348 60.3 104.804 59.2412 102.929 57.3564C101.054 55.4717 100 52.9154 100 50.25V30.15ZM20 80.4C19.997 75.4629 21.2026 70.6009 23.5106 66.2426C25.8185 61.8843 29.1579 58.1636 33.2344 55.4085C38.1825 52.0398 44.0234 50.2426 50 50.25H80C80 58.2463 83.1607 65.915 88.7868 71.5693C94.4129 77.2235 102.044 80.4 110 80.4C117.956 80.4 125.587 77.2235 131.213 71.5693C136.839 65.915 140 58.2463 140 50.25H260C260 58.2463 263.161 65.915 268.787 71.5693C274.413 77.2235 282.044 80.4 290 80.4C297.956 80.4 305.587 77.2235 311.213 71.5693C316.839 65.915 320 58.2463 320 50.25H350C357.424 50.2569 364.583 53.0274 370.094 58.0269C375.606 63.0264 379.079 69.9004 379.844 77.3222C379.948 78.3448 380 79.3721 380 80.4V120.6H20V80.4ZM335 381.9H65C56.1478 381.885 47.4967 379.245 40.131 374.311C32.7653 369.376 27.0125 362.367 23.5938 354.16C31.5064 359.151 40.6584 361.798 50 361.8H350C359.342 361.798 368.494 359.151 376.406 354.16C372.987 362.367 367.235 369.376 359.869 374.311C352.503 379.245 343.852 381.885 335 381.9ZM380 311.55C379.992 319.544 376.828 327.208 371.204 332.86C365.58 338.513 357.954 341.692 350 341.7H50C42.046 341.692 34.4202 338.513 28.7959 332.86C23.1716 327.208 20.0083 319.544 20 311.55V140.7H380V311.55Z"/>
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="100%" height="100%" fill="grey"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
}

const Block = styled.View`
  overflow: hidden;
  width: ${SIZES.icon}px;
  height: ${SIZES.icon}px;
`
const Row = styled(Block)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  background: transparent;
  padding: 0;
  margin-top: ${SIZES.icon/12}px;
`
const TextCenter = styled.Text<Obj>`
  font-size: ${(props: Obj) => props.size}px;
  align-self: center;
  text-align: center;
  color: grey;
`