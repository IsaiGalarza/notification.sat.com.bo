const cron = require('node-cron');
const express = require('express');

const { partnerSignCheck } = require('./services/partnerSignCheck');
const { cronExpression } = require('./util/config').config;

const CRON_EXPRESSION = cronExpression;
cron.schedule(CRON_EXPRESSION, partnerSignCheck);

console.log('Timer-based microservice running...');

const app = express();

app.get('/health', (req, res) => {
  res.status(200).send({ status: 'ok', message: 'Service is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
