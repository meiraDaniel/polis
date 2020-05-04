const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const { videoToken } = require('./geraTwilioToken');
const clientTwilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

const sendRoomsList = (roomNames, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      rooms: roomNames
    })
  );
};

app.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.post('/lista_salas', (req, res) => {
  clientTwilio.video.rooms.list({status: 'in-progress'})
                  .then(rooms => rooms.map(room => room.uniqueName)).then(roomsNames => sendRoomsList(roomsNames, res));
});


app.listen(3001, () =>
  console.log('Express server está rodando na porta 3001')
);
