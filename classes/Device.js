export default class Device {
    constructor(id, name, topic, floor) {
        this.id = id
        this.name = name
        this.topic = topic
        this.floor = floor
    }

    subscribe(client) {
			client.subscribe(this.topic)
	}

    process(topic, message) {}
    
}

