const TelegramBot = require('node-telegram-bot-api');
const { TELEGRAM_TOKEN, TELEGRAM_RECIPIENTS_TO, TELEGRAM_TEMPLATE_MESSAGE } = require('./config').telegram;

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

exports.sendTelegram = async data => {
  try {
    const token = TELEGRAM_TOKEN;
    const bot = new TelegramBot(token, {polling: false});
    const {SubmissionID, TITLE, MESSAGE, categoria, foto, detalle, fecha, hora, user, coordenada} = data;

    //Replace Template
    const templateNotification = TELEGRAM_TEMPLATE_MESSAGE.replace('%SubmissionID%', SubmissionID)
                                .replace('%categoria%', categoria)
                                .replace('%user%', user)
                                .replace('%categoria%', categoria)
                                .replace('%coordenada%', coordenada)
                                .replace('%maps%', formatCoordinates(coordenada))
                                .replace('%detalle%', detalle)
                                .replace('%fecha%', fecha)
                                .replace('%hora%', hora);


    bot.sendMessage(TELEGRAM_RECIPIENTS_TO, templateNotification, { parse_mode: 'HTML' });

    console.log('Telegram sent:', SubmissionID);

   } catch (err) {
     console.error(err);
     throw err;
   }
}