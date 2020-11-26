import { AIRTABLE_ID } from '@env';

const sortLOGS = 'sort%5B0%5D%5Bfield%5D=Time&sort%5B0%5D%5Bdirection%5D=desc'
const sortBUDGET = 'sort%5B0%5D%5Bfield%5D=Category&sort%5B0%5D%5Bdirection%5D=asc'
const filterBUDGET = 'filterByFormula=NOT(Right(%7BCategory%7D%2C+1)+%3D+%22%3D%22)'
const url = `https://api.airtable.com/v0/appA67zYW50gE6q8E/`
const headers = { Authorization: `Bearer ${AIRTABLE_ID}` }

const callAPI = (table, options) => (
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

const postLogRecord = (fields: object) => {
  console.log('will try to save fields: ', fields)
  fields.Amount = parseInt(fields.Amount)
  headers['Content-Type'] = 'application/json'
  return callAPI('LOG', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({"fields":fields})
  })
}

export { getLogRecords, postLogRecord, getBudgetRecords };
