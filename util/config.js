const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  pg: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: false,
    max: process.env.PG_MAX_CONNECTIONS || 20, // set pool max size to 20
    idleTimeoutMillis: process.env.PG_TIMEOUT || 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 5000, // return an error after 1 second if connection could not be established
    maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion),
  },
  teamplate:{
    TEMPLATE_MAIL_SUBJECT: process.env.TEMPLATE_MAIL_SUBJECT,
    TEMPLATE_MAIL_MESSAGE: process.env.TEMPLATE_MAIL_MESSAGE
  },
  telegram:{
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
    TELEGRAM_RECIPIENTS_TO: process.env.TELEGRAM_RECIPIENTS_TO,
    TELEGRAM_TEMPLATE_MESSAGE: process.env.TELEGRAM_TEMPLATE_MESSAGE
  },
  mail:{
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_FROM: process.env.MAIL_FROM,
    MAIL_RECIPIENTS_TO: process.env.MAIL_RECIPIENTS_TO
  },
  config:{
    cronExpression: process.env.CRON_EXPRESSION,
    DELAY_MINUTES: process.env.DELAY_MINUTES
  }
};
