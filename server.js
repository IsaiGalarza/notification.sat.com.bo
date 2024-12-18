const cron = require('node-cron');
const { partnerSignCheck } = require('./services/partnerSignCheck');
const { cronExpression } = require('./util/config').config;

const CRON_EXPRESSION = cronExpression;
cron.schedule(CRON_EXPRESSION, partnerSignCheck);

console.log('Timer-based microservice running...');
