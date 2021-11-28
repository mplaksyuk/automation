class Device {
    constructor(name, topic, floor) {
        this.name = name
        this.topic = topic
        this.floor = floor
    }

    process(message) {
    }
}

module.exports = Device;