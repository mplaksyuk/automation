const mqtt = require('mqtt');

class Manager {
    devices = { };
    client;

    constructor() {
          
    }

    connect (url) {
        this.client = mqtt.connect(url, { clientId: 'home-automation' });
        
        this.client.on('connect', () => {
            console.log("mqtt-connect");
            Object.keys(this.devices).forEach(topic => this.client.subscribe(topic));
        });

        this.client.on('message', (topic, buffer) => {
            console.log('message is received');
            const message = JSON.parse(buffer);
            console.log(message);
            const device = this.devices[topic];

            if(device)
                device.process(message);
        });
    }

    get list() {
        return Object.values(this.devices).map(device => device);
    }

    add (device) {
        this.devices[device.topic] = device;
    }
}

module.exports = Manager;