class TelescopeManager {
    constructor() {
        this.strategies = {}
    }

    addStrategy(name, telescope, conversionFactor) {
        this.strategies[name] = {
            "strategy": telescope,
            "conversionFactor": conversionFactor,
            "name": name
        }
    }
}

const telescopeManager = new TelescopeManager()

module.exports = { telescopeManager }