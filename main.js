const Manager = require('./classes/Manager.js');
const Socket = require('./classes/Socket.js');
const Temp = require('./classes/Temp.js');

const T1 = 20.0
const T2 = 20.0

const DIFFERENCE = 0.1

// const process = function(temp, socket, Temp) {
// 	const currentTemp = temp.getTemp();
// 	if (typeof t === 'number') {
// 		if (currentTemp < Temp - DIFFERENCE)
// 			socket.set(true);

// 		if (currentTemp > Temp + DIFFERENCE)
// 			socket.set(false);
// 	}
// };

// const updateSite = () => {
// 	let t1 = +temp1.getTemp()
// 	let h1 = +temp1.getHumidity()
// 	let t2 = +temp2.getTemp()
// 	let h2 = +temp2.getHumidity()

// 	let s1 = socket1.state()
// 	let s2 = socket2.state()
	
// 	// todo
// }

const socket1 = new Socket("Socket1", "zigbee2mqtt/0x00158d00035cd92b", 1)
const socket2 = new Socket("Socket2", "zigbee2mqtt/0x00158d000322de44", 1)

const temp1 = new Temp("Temp1", 'zigbee2mqtt/0x00158d0002d7db55', 1)
const temp2 = new Temp("Temp2", 'zigbee2mqtt/0x00158d0002d7933c', 2)

const manager = new Manager();

manager.add(socket1);
manager.add(socket2);

manager.add(temp1);
manager.add(temp2);

manager.connect('mqtt://192.168.1.101');

const { get } = require('browser-sync');
const { parseJSON } = require('jquery');

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

manager.onmessage((message) => {
	console.log(message.toString());
	wss.clients.forEach(client => {
		if(client.readyState === WebSocket.OPEN){
			client.send(JSON.stringify(message));
		}
	});
});

wss.on('connection', ws => {
	console.log("message from ws");
    ws.on('message', message => {
		console.log("messege in function");
        console.log(message.toString());
        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        });
    })
});

app.use(express.json());

app.post('/api/v1/state', function(req, res) {
	const data = req.body;
	console.log("received" + data);
	console.log(data.state);
	console.log(data.topic);
	manager.set(data.state, data.topic);
});

app.get('/api/v1/devices', function(req, res) {
	console.log(manager.list);
	res.send(manager.list);
});

app.get('/api/v1/temp', function(req,res) {
	console.log(temp1.temp);
	//console.log(temp2.temp);
	res.send.json(temp1.temp);
});

/*app.ws('/', function(ws, req) {
	ws.on('message', function(msg) {
		console.log(msg);
	});
	console.log('socket', req.testing);
});*/

app.get('/*', express.static('./build'));

server.listen(9090);