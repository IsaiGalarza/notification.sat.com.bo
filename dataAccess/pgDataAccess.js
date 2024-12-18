const connection = require('./pgConnection');

exports.getPendings = async () => {
  try {
    const query =
    `SELECT BLR.account_number
    FROM business_loan_documents BLD INNER JOIN
      business_loans_request BLR ON BLD.request_id = BLR.id
    WHERE BLD.status = 'PARTNER_SIGNING'
      AND BLD.step_result = 'WAITING'
      AND date_part('day', CURRENT_TIMESTAMP - BLD.updated_at) = 1;`;
    const result = await connection.executeSql(query);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.insertNotifications = async data => {
  try {
    const {recipients, batchSize, TITLE, MESSAGE} = data;
    const query =
    `INSERT INTO notifications_queue
      (title, body, priority, retries, recipients, batch_size, created_at, before_to)
      VALUES ('${TITLE}', '${MESSAGE}', 10, 0, '${recipients}', ${batchSize}, CURRENT_TIMESTAMP, NULL); `;
    const result = await connection.executeSql(query);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

