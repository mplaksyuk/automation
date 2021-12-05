const { response } = require('express');
const mqtt = require('mqtt');



class Manager {
    devices = { };
    client;
    callback = (msg) => { };

    constructor(callback) {
        this.callback = callback;
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

            if (device)
                device.process(message, this.callback);
        });
    }

    set(state,topic) {
        const device = this.devices[topic];
        console.log(this.devices[topic]);
        device.set(state,this.client);
    }

    get list() {
        return Object.values(this.devices).map(device => device);
    }

    add (device) {
        this.devices[device.topic] = device;
    }

    onmessage (callback) {
        this.callback = callback;
    }
}

module.exports = Manager;