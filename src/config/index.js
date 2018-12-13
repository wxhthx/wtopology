/**
 * @description consist of config values, including user defined and the default
 */
const config_default = {
    rootId: null,
    scaleExtent: [1 / 2, 5],
    events: {
        node_mouseover: function () {},
        node_mouseout: function () {},
        node_mousedown: function () {}
    }
}

class config {
    constructor (_config) {
        this.config = { ...config_default, ..._config }
    }
    getConfig () {
        return this.config
    }
}

export default config
