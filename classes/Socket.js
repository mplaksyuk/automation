const Device = require("./Device.js");

class Socket extends Device {
    type = "socket";
    state = null;
    consumption;
    linkquality;
    power;
    temperature;

    constructor(name, topic, floor) {
        super(name, topic, floor)
    }

    //get state() { return this.state }

    set(state,client) {
        const s = state;
        if (s != this.state) {
            client.publish(this.topic + '/set', s)
            this.state = s;
            console.log(`Turn ${this.name} ${s}`)
        }
    }

    process(message, callback) {
        this.consumption = message.consumption;
        this.linkquality = message.linkquality;
        this.power = message.power;
        this.temperature = message.temperature;

        if (this.state != message.state) {
			this.state = message.state;
			console.log(`Set ${this.name} ${this.state}`)
		}

        callback(Object.assign({ }, this));
    }
}

module.exports = Socket;