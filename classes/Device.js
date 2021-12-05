class Device {
    constructor(name, topic, floor) {
        this.name = name
        this.topic = topic
        this.floor = floor
    }

    process(message, callback) {
    }

    set(state,client) {

    }
}

module.exports = Device;