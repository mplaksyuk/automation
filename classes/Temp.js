const Device = require("./Device.js");

class Temp extends Device {
    type = 'thermometer';
    temperature;
    humidity;
    battery;
    linkquality;
    pressure;
    voltage;

    constructor(id, name, topic, floor) {
        super(id, name, topic, floor)
    }

    get temp() { return this.temperature }

	get humidity() { return this.humidity }	
    
    process(message) {
        this.humidity = message.humidity
        this.battery = message.battery
        this.linkquality = message.linkquality
        this.pressure = message.pressure
        this.voltage = message.voltage
        if (this.temperature != message.temperature) {
            this.temperature = message.temperature
            console.log(`${this.name} = ${this.temp}`)
        }
    }
}

module.exports = Temp;