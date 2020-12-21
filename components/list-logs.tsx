import React from 'react';
import { Row } from '../styles';
import { Text, View, Image } from 'react-native';
import {Obj} from '../interfaces';
import Chart from './chart';
import SIZES from '../utils/sizes';
// @ts-ignore

function Card(props:any) {
  const {Type, Amount, Desc, Category} = props.fields;

  return (
    <Row style={{backgroundColor: '#191919', borderWidth: 1, borderColor: '#111', padding: 15, borderRadius: 20}}>
    <View>
      <Chart limit={.8} size={SIZES.largeText}>
        {/* {console.log("props.cat in Log Card:", props.cat)} */}
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white'}}>{props.cat.fields.Icon}</Text>
        </View>
      </Chart>
    </View>
    <View style={{flex: 1, marginHorizontal: 15}}>
      <Text style={{color: "white", fontSize: SIZES.xsText}}>{Desc}</Text>
      <Text style={{color: "white", fontSize: SIZES.xsText}}>to December 6</Text>
    </View>
    <View>
      <Text style={{color: "white", fontSize: SIZES.xsText}}>$1412</Text>
      <Text style={{color: "white", fontSize: SIZES.xsText}}>/$910</Text>
    </View>
  </Row>
  )
}

function ListLogs(props:any) {
  const logs = props.logs

  // console.log(
  //   "props.cats.find recIuWF2DZnCf9tfy is:", 
  //   props.cats.find((cat:any) => cat.id === "recIuWF2DZnCf9tfy")
  // )

  if(!logs) return (<Text style={{color: 'white'}}>Loading...</Text>)

  return(
    <View style={{backgroundColor: '#222', height: '100%'}}>
      <Text style={{color: 'white'}}>
      </Text>
      <Row>
        <Text style={{color: 'white'}}>Amount</Text>
        <Text style={{color: 'white'}}>Description</Text>
        <Text style={{color: 'white'}}>Category</Text>
      </Row>
      { 
        logs.map((log:any) => {
          return (
            <Card 
              key={log.id} 
              fields={log.fields}
              cat={
                props.cats.find((cat:any) => cat.id === log.fields.Category[0])
              }
            />
          )
        })
      }
    </View>
  )
}

export default ListLogs;
