import { AIRTABLE_ID } from '@env';
const Airtable = require('airtable');
const base = new Airtable({apiKey: AIRTABLE_ID}).base('appA67zYW50gE6q8E');

const getLogRecords = async () => {
  return await base('LOG').select({ sort: [{field: "Time", direction: "desc"}] })
}

const postLogRecord = async (fields) => {
  base('LOG').create(fields, (err, record) => {
    if (err) {
      console.error(err);
      return err;
    }
    console.log('created record ', record.getId());
    return {success: `created record ${record.getId()}`}
  });
}

export { getLogRecords, postLogRecord };
