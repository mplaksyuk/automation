const T1 = 20.0;
const T2 = 20.0;

const D = 0.1;

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.1.101', { clientId: 'home-automation' });


const createSocket = function(name, topic) {
	let state = null;

	return {
		set: function(v) {
			const s = v ? 'ON' : 'OFF';
			if (s != state) {
				console.log(`Turn ${name} ${s}`);
				client.publish(topic + '/set', s);
			}
		},

		process: function(t, m) {
			if (t == topic && state != m.state) {
				state = m.state;
				console.log(`Set ${name} ${state}`);
			}
		},

		subscribe: function() {
			client.subscribe(topic);
		}
	};
};

const createTemp = function(name, topic) {
	let temp = null;

	return {
		get: function() {
			return temp;
		},

		process: function(t, m) {
			if (t == topic && temp != m.temperature) {
				temp = m.temperature;
				console.log(`${name} = ${temp}`);
			}
		},

		subscribe: function() {
			client.subscribe(topic);
		}
	};
};


const sock1a = createSocket('Socket1', 'zigbee2mqtt/0x00158d00035cd92b');
const sock1b = createSocket('Socket2', 'zigbee2mqtt/0x00158d000322de44');

const temp1a = createTemp('Temp1', 'zigbee2mqtt/0x00158d0002d7db55');
const temp2a = createTemp('Temp2', 'zigbee2mqtt/0x00158d0002d7933c');

const process = function(temp, socket, T) {
	const t = temp.get();
	if (typeof t === 'number') {
		if (t < T - D)
			socket.set(true);

		if (t > T + D)
			socket.set(false);
	}
};

client.on('connect', function() {
	console.log('Connected');

	temp1a.subscribe();
	temp2a.subscribe();

	sock1a.subscribe();
	sock1b.subscribe();

	sock1a.set(false);
	sock1b.set(false);

});

client.on('message', function(topic, buffer) {
	const message = JSON.parse(buffer);

	sock1a.process(topic, message);
	sock1b.process(topic, message);
	temp1a.process(topic, message);
	temp2a.process(topic, message);

	process(temp1a, sock1a, T1);
	process(temp2a, sock1b, T2);
});
