const { getPendings, insertNotifications } = require("../dataAccess/pgDataAccess");
const {
  PUSH_TITLE,
  PUSH_MSG_03
} = require('../util/config').loans;
exports.partnerSignCheck = async () => {
  try {
    const timeStamp = new Date().toISOString();
    console.log(`Tarea ejecutada a las: ${timeStamp}`);
    const pendings = await getPendings();
    console.log(`pendings::${JSON.stringify(pendings)}`);
    if (pendings.length > 0) {
      const accountNumbers = pendings.map(item => item.account_number);
      const batchSize = accountNumbers.length;
      const recipients = JSON.stringify(accountNumbers);
      await insertNotifications({recipients, batchSize, TITLE: PUSH_TITLE, MESSAGE:PUSH_MSG_03});
    }
  } catch (e) {
    console.log(`partnerSignCheck Error: ${JSON.stringify(e?.message)}`);
  }
};