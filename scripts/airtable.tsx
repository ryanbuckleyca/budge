// @ts-ignore
import { AIRTABLE_ID } from '@env';
import { Headers, Entry } from '../interfaces';

const sortLOGS = 'sort%5B0%5D%5Bfield%5D=Time&sort%5B0%5D%5Bdirection%5D=desc'
const sortBUDGET = 'sort%5B0%5D%5Bfield%5D=Category&sort%5B0%5D%5Bdirection%5D=asc'
const filterBUDGET = 'filterByFormula=NOT(Right(%7BCategory%7D%2C+1)+%3D+%22%3D%22)'
const url = `https://api.airtable.com/v0/appA67zYW50gE6q8E/`
const headers:Headers = { Authorization: `Bearer ${AIRTABLE_ID}` }


const callAPI = (table:string, options:object) => (
  fetch(url+table, options)
    .then(res => res.json())
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

const getBudgetRecords = () => (
  callAPI('Budget?'+sortBUDGET+'&'+filterBUDGET, {
    method: 'GET',
    headers: headers
  })
)

const postToLogs = (recordsList:Array<Entry>) => {
  const formatedRecords = {
    records: recordsList.map((record:Entry) => (
      {"fields": record}
    ))
  }
  headers['Content-Type'] = 'application/json'
  return callAPI('LOG', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(formatedRecords)
  })
}

export { 
  getLogRecords, 
  postToLogs, 
  getBudgetRecords 
};
