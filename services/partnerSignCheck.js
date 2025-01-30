const { getPendings } = require("../dataAccess/pgDataAccess");
const { sendNotifications } = require("../util/serviceNotifications");
const { TEMPLATE_MAIL_SUBJECT, TEMPLATE_MAIL_MESSAGE } = require('../util/config').teamplate;

exports.partnerSignCheck = async () => {
  
  try {

    const timeStamp = new Date().toISOString();
    console.log(`Tarea ejecutada a las: ${timeStamp}`);
    const pendings = await getPendings();
    console.log(`pendings submissions notifications from ODK::${JSON.stringify(pendings)}`);
    
    if (pendings.length > 0) {
      const submissions = pendings.map(item => item);
      const batchSize = submissions.length;
      const collects = JSON.stringify(submissions);

      //Controlador de Notificaciones
      await sendNotifications({collects, TITLE: TEMPLATE_MAIL_SUBJECT, MESSAGE:TEMPLATE_MAIL_MESSAGE});
 
    }

  } catch (e) {
    console.log(`partnerSignCheck Error: ${JSON.stringify(e?.message)}`);
  }
};