const Device = require("./Device.js");

class Socket extends Device {
    type = "socket";
    state = "OFF";
    consumption;
    linkquality;
    power;
    temperature;

    constructor(name, topic, floor) {
        super(name, topic, floor)
    }

    get state() { return this.state }

    set state(state) {
        const s = state ? 'ON' : 'OFF'
        if (s != this.state) {
            client.publish(this.topic + '/set', s)
            console.log(`Turn ${this.name} ${s}`)
        }
    }

    process(message) {
        if (this.state != message.state) {
			this.state = message.state
            this.consumption = message.consumption
            this.linkquality = message.linkquality
            this.power = message.power
			console.log(`Set ${this.name} ${this.state}`)
		}
    }
}

module.exports = Socket;