// @ts-ignore
import { AIRTABLE_ID } from '@env';
import { Headers, Entry } from '../interfaces';

const sortLOGS = 'sort%5B0%5D%5Bfield%5D=Time&sort%5B0%5D%5Bdirection%5D=desc'
const sortCATS = 'sort%5B0%5D%5Bfield%5D=Category&sort%5B0%5D%5Bdirection%5D=asc'
const url = `https://api.airtable.com/v0/appA67zYW50gE6q8E/`
const headers:Headers = { Authorization: `Bearer ${AIRTABLE_ID}` }


const callAPI = (table:string, options:object) => (
  fetch(url+table, options)
    .then(res => {
      if (res === null) throw new Error('no records found');
      return res.json()
    })
    .catch(err => {
      console.log(err)
      return {error: err}
    })
)

const getLogRecords = () => (
  callAPI('LOG?'+sortLOGS, {
    method: 'GET',
    headers: headers
  })
)

const getCatRecords = () => (
  callAPI('CATS?'+sortCATS, {
    method: 'GET',
    headers: headers
  })
)

const uploadRecords = (recs:Array<Entry>) => {
  const formattedRecs = {
    records: recs.map((rec:Entry) => ({"fields": rec}))
  }
  headers['Content-Type'] = 'application/json'
  return callAPI('LOG', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(formattedRecs)
  })
}

export { 
  getLogRecords, 
  uploadRecords, 
  getCatRecords 
};
