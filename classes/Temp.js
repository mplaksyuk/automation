const Device = require("./Device.js");

class Temp extends Device {
    type = 'thermometer';
    temp;
    humidity;

    constructor(id, name, topic, floor) {
        super(id, name, topic, floor)
    }

    get temp() { return this.temp }

	get humidity() { return this.humidity }	
    
    process(message) {
        if (this.temp != message.temperature) {
            this.temp = message.temperature
            console.log(`${this.name} = ${this.temp}`)
        }
    }
}

module.exports = Temp;