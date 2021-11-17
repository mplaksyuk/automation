import Device from "./Device"

export default class Temp extends Device {
    constructor(id, name, topic, floor) {
        super(id, name, topic, floor)
        this.temp = null
        this.humidity = null
    }

    getTemp() { return this.temp }
	getHumidity() { return this.humidity }	
    
    process(topic, message) {
        if (this.topic == topic && this.temp != message.temperature) {
            this.temp = message.temperature
            console.log(`${this.name} = ${this.temp}`)
        }
    }
		
}