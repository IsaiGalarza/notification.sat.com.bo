const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM, MAIL_RECIPIENTS_TO } = require('../util/config').mail;
const readFileAsync = promisify(fs.readFile);

function formatCoordinates(coordenadas) {
  // Dividimos la cadena por los espacios
  const partes = coordenadas.split(' ');

  // Tomamos solo las dos primeras partes: latitud y longitud
  const latitud = partes[0];
  const longitud = partes[1];

  // Concatenamos latitud y longitud con una coma
  const coordenadasFormateadas = `${latitud},${longitud}`;

  return coordenadasFormateadas;
}
exports.sendEmail = async data => {
  try {
    const {SubmissionID, TITLE, MESSAGE, categoria, foto, detalle, fecha, hora, user, coordenada} = data;

    // Read the HTML template and image file
    const htmlTemplate = await readFileAsync('/home/nodeuser/app/util/template.html', 'utf-8');
    const imageAttachment = await readFileAsync('/home/nodeuser/app/util/image.jpg');

    const mailSubject = TITLE.replace('{%Number%}', SubmissionID);
    
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: false, // use SSL
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      }
    });

    //Replace Template HTML
    const htmlTemplateUpdate = htmlTemplate.replace('%SubmissionID%', SubmissionID)
                                .replace('%categoria%', categoria)
                                .replace('%MESSAGE%', MESSAGE)
                                .replace('%user%', user)
                                .replace('%categoria%', categoria)
                                .replace('%coordenada%', coordenada)
                                .replace('%maps%', formatCoordinates(coordenada))
                                .replace('%detalle%', detalle)
                                .replace('%fecha%', fecha)
                                .replace('%hora%', hora);

    // Send email
    const info = await transporter.sendMail({
        from: '"NOTIFICACION SAT" no-reply@qbit.com.bo',
        to: MAIL_RECIPIENTS_TO,
        subject: mailSubject,
        html: htmlTemplateUpdate,
        attachments: [{
            filename: 'image.png',
            content: imageAttachment,
            encoding: 'base64',
            cid: 'uniqueImageCID' // Referenced in the HTML template
        }],
    });

    console.log('Email sent:', info.messageId);

   } catch (err) {
     console.error(err);
     throw err;
   }
}