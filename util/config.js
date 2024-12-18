const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  pg: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: {
      rejectUnauthorized: false, // No verifiques el certificado
    },
    max: process.env.PG_MAX_CONNECTIONS || 20, // set pool max size to 20
    idleTimeoutMillis: process.env.PG_TIMEOUT || 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 5000, // return an error after 1 second if connection could not be established
    maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion),
  },
  loans:{
    PUSH_TITLE: process.env.PUSH_TITLE,
    PUSH_MSG_03: process.env.PUSH_MSG_03
  },
  config:{
    cronExpression: process.env.CRON_EXPRESSION
  }
};
