import React from 'react';
import { Row } from '../styles';
import { Text, View, Image } from 'react-native';
import {Obj} from '../interfaces';
import Chart from './chart';
import SIZES from '../utils/sizes';
// @ts-ignore
import { ICON_FINDER_API } from '@env';


fetch('https://api.iconfinder.com/v4/categories', { 
  method: 'GET', 
  mode: 'cors',
  headers: new Headers({
    Authorization: `Basic ${ICON_FINDER_API}`
  })
})
.then(res => res.json())
.then(
  data => console.log('fetch from iconfinder: ', data)
)
.catch(err => console.log(err))

function Card(props) {
  const {Type, Amount, Description, Category} = props;
  return (
    <Row style={{backgroundColor: '#191919', borderWidth: 1, borderColor: '#111', padding: 15, borderRadius: 20}}>
    <View>
      <Chart limit={.8} size={SIZES.largeText}>
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {/* <Image /> */}
        </View>
      </Chart>
    </View>
    <View style={{flex: 1, marginHorizontal: 15}}>
      <Text style={{color: "white", fontSize: SIZES.xsText}}>November 30</Text>
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

      { logs.map((log:any) => <Card fields={log.fields} />) }
    </View>
  )
}

export default ListLogs;
