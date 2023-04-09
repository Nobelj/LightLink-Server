const ws = require('ws');
const wss = new ws.WebSocketServer({ port: 3000 });
let deviceNo = 0;

let wsmine = null;

const express = require('express');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
httpServer.listen(5000, () => {
  console.log('Server page started on http://localhost:5000');
});
let mode = 0;

function connection(wsnew) {    
    wsmine = wsnew;
    deviceNo++;
    wsnew.on('error', console.error);

    wsnew.on('message', function message(data) {
        console.log('received: %s', data);
    });

    wsnew.send("DeviceID:" + deviceNo);
    console.log('Device connected: %s', deviceNo);
}
app.get('/', function (req, res) {~
    res.send('Hello World!');
    changeMode();
});
wss.broadcast = function(data) {
  wss.clients.forEach(client => client.send(data));
};
wss.on('connection',connection);
function changeMode() {
    if (mode == 4) {
        mode = 0;
    }
    mode++;
    console.log('Mode changed');
    wss.broadcast("Mode:" + mode);
}
