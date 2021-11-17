import Device from "./Device"

export default class Socket extends Device {
    constructor(id, name, topic, floor) {
        super(id, name, topic, floor)
        this.state = null
    }

    get() { return this.state }

    set(state) {
        const s = state ? 'ON' : 'OFF'
        if (s != this.state) {
            client.publish(this.topic + '/set', s)
            console.log(`Turn ${this.name} ${s}`)
        }
    }
    process(topic, message) {
        if (this.topic == topic && this.state != message.state) {
				this.state = message.state
				console.log(`Set ${this.name} ${this.state}`)
		}
    }
    
}