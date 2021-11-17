import Socket from './classes/Socket'
import Temp from './classes/Temp'

const T1 = 20.0
const T2 = 20.0

const DIFFERENCE = 0.1

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://192.168.1.101', { clientId: 'home-automation' })

const process = function(temp, socket, Temp) {
	const currentTemp = temp.getTemp();
	if (typeof t === 'number') {
		if (currentTemp < Temp - DIFFERENCE)
			socket.set(true);

		if (currentTemp > Temp + DIFFERENCE)
			socket.set(false);
	}
};

const socket1 = new Socket(1, "Socket1", "zigbee2mqtt/0x00158d00035cd92b", 1)
const socket2 = new Socket(2, "Socket2", "zigbee2mqtt/0x00158d000322de44", 2)

const temp1 = new Temp(1, "Temp1", 'zigbee2mqtt/0x00158d0002d7db55', 1)
const temp2 = new Temp(2, "Temp2", 'zigbee2mqtt/0x00158d0002d7933c', 2)


const subscribeAll = (...devices) => {
    devices.forEach(device => device.subscribe(client))
}

const processAll = (topic, message, ...devices) => {
    devices.forEach(device => device.process(topic, message))
}

//Subscribe devices to server
client.on('connect', () => {
	console.log('Connected')

    subscribeAll(temp1, temp2, socket1, socket2)

	socket1.set(false);
	socket2.set(false);
});

//Update
client.on('message', (topic, buffer) => {
	const message = JSON.parse(buffer);

    //Update device at home
    processAll(topic, message, socket1, socket2, temp1, temp2)
	process(temp1, socket1, T1);
	process(temp2, socket2, T2);

    //Update Cite data
});