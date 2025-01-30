const connection = require('./pgConnection');
const { DELAY_MINUTES } = require('../util/config').config;

exports.getPendings = async () => {
  try {
   
    const query =
    `SELECT A.id as submissionid, B."xml" as xml, C."displayName" as user
      FROM public.submissions A
        INNER JOIN public.submission_defs B ON A.id = B."submissionId"
        INNER JOIN public.actors C ON B."submitterId" = C.id
      WHERE A.draft = false
      AND A."createdAt" >= (CURRENT_TIMESTAMP - INTERVAL '${DELAY_MINUTES} minutes');`;
    
    const result = await connection.executeSql(query);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

