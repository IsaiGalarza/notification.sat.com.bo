const { sendEmail } = require("../util/sendEmail");
const { sendTelegram } = require("../util/sendTelegram");
const { XMLParser } = require('fast-xml-parser'); 

exports.sendNotifications = async data => {

  try {
    const {collects, TITLE, MESSAGE} = data;
    const collectsArray = JSON.parse(collects);
    const parser = new XMLParser();

    //Loop
    collectsArray.forEach((row) => {
 
      // Analizar el XML
      const parsedXml = parser.parse(row.xml);

      // Extraer los campos específicos
      let categoria = parsedXml.data.fauna || 
                  parsedXml.data.accidentes || 
                  parsedXml.data.contaminacion || 
                  parsedXml.data.antropico || 
                  parsedXml.data.recuperacion || 
                  parsedXml.data.delitos || 
                  parsedXml.data.flora || 
                  parsedXml.data.violencia || 
                  parsedXml.data.estado_carretera;
       
      const foto = parsedXml.data.foto;
      const detalle = parsedXml.data.detalle;
      const coordenada = parsedXml.data.coordenada;
      const fecha = parsedXml.data.fecha;
      const hora = parsedXml.data.hora;
 
      // Enviar Mails por Cada Submission
      sendEmail({ SubmissionID: row.submissionid, TITLE, MESSAGE, categoria, foto, detalle, fecha, hora , user: row.user, coordenada});

      //Enviar Telegram
      sendTelegram({ SubmissionID: row.submissionid, TITLE, MESSAGE, categoria, foto, detalle, fecha, hora , user: row.user, coordenada });

      //Enviar Whatsapp
      //TODO
      
    });

  } catch (err) {
    console.error(err);
    throw err;
  }
};

