const Pool = require('pg-pool');
const config = require('../util/config');

let client;

const startPgConnection = async () => {
  const pool = new Pool(config.pg);

  pool.on('connect', (client) => {
    console.log('pg connected..');
  });

  pool.on('error', function (error, client) {
    console.log('Error:', error);
  });

  client = await pool.connect();
};

const executeSql = async (query, params = []) => {
  if (!client) {
    await startPgConnection();
  }
  const result = await client.query(query);

  return result.rows;
};

module.exports = {
  startPgConnection,
  executeSql,
};