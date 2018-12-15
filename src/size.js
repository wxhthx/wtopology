import TopologyChart from './core'

TopologyChart.prototype.getCurrentWidth = function () {
    let $$ = this, configs = $$.configs;
    return configs.size_width ? configs.size_width : $$.getParentWidth()
}

TopologyChart.prototype.getCurrentHeight = function () {
    let $$ = this, configs = $$.configs;
    return configs.size_height ? configs.size_height : $$.getParentHeight()
}

TopologyChart.prototype.getParentRectValue = function (key) {
    var parent = this.element.node(), v
    while (parent && parent.tagName !== 'BODY') {
        try {
            v = parent.getBoundingClientRect()[key]
        } catch(e) {
            if (key === 'width') {
                // In IE in certain cases getBoundingClientRect
                // will cause an "unspecified error"
                v = parent.offsetWidth
            }
        }
        if (v) {
            break
        }
        parent = parent.parentNode
    }
    return v
};

TopologyChart.prototype.getParentWidth = function () {
    return this.getParentRectValue('width')
}
TopologyChart.prototype.getParentHeight = function () {
    return this.getParentRectValue('height')
}