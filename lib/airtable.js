const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);
const table = base('coffee-shops');

const getMinifiedRecord = (record) => {
    return {
        ...record.fields
    };
};

const getMinifiedRecords = (records) => {
    return records.map(record => getMinifiedRecord(record));
};

export {table, getMinifiedRecords };