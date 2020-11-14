import { AIRTABLE_ID } from '@env';

const airtableLogsURL = 'https://api.airtable.com/v0/appA67zYW50gE6q8E/LOG'
const headers = { Authorization: `Bearer ${AIRTABLE_ID}` }

const callAPI = (options) => {
  return fetch(airtableLogsURL, options)
    .then(res => res.json())
}

const getLogRecords = () => {
  return callAPI({
    method: 'GET',
    headers: headers
  })
}

const postLogRecord = (fields) => {
  headers['Content-Type'] = 'application/json'
  return callAPI({
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ "fields": fields })
  })
}

  export { getLogRecords, postLogRecord };
