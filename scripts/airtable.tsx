import { AIRTABLE_ID } from '@env';

const sort = '?sort%5B0%5D%5Bfield%5D=Time&sort%5B0%5D%5Bdirection%5D=desc'
const urlLOGS = `https://api.airtable.com/v0/appA67zYW50gE6q8E/LOG`+sort
const headers = { Authorization: `Bearer ${AIRTABLE_ID}` }

const callAPI = (options) => {
  console.log('calling api with options: ', options)
  return fetch(urlLOGS, options)
    .then(res => res.json())
    .catch(err => {error: err})
}

const getLogRecords = () => {
  return callAPI({
    method: 'GET',
    headers: headers
  })
}

const postLogRecord = (fields) => {
  console.log('will process fields: ', fields)
  headers['Content-Type'] = 'application/json'
  return callAPI({
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ "fields": fields })
  })
}

  export { getLogRecords, postLogRecord };
