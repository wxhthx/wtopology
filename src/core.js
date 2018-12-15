import TopologyChart from './topology-chart'

/**
 * @description initialize dom constrcture
 * @author xinghua.wen
 */
TopologyChart.prototype.initiazation = function (_visuazationData) {
    // _component_data.dom = DomData.getData()
    // if (this._visuazationData && this._visuazationData.nodes)
    //     _component_data.nodes = this._visuazationData.nodes
    let $$ = this
    let configs = $$.configs
    $$.svgNode = null
    $$.nodeContainer = null
    $$.linkContainer = null
    $$.groupContainer = null
    $$.nodes = []
    $$.nodesEnter = []
    $$.nodesUpdate = []
    $$.nodesExit = []
    $$.redrawNodes()
}

TopologyChart.prototype.getDefaultConfigs = function () {
    let config = {
        rootId: null,
        scaleExtent: [1 / 2, 5],
        node_mouseover: function () {},
        node_mouseout: function () {},
        node_mousedown: function () {}
    }

    Object.keys(this.costomConfig).forEach(function (key) {
        config[key] = this.costomConfig[key];
    }, this);
    return config;
}

TopologyChart.prototype.costomConfig = {}

TopologyChart.prototype.initSvgContainer = function () {
    let $$ = this
    const d3 = $$.d3
    
    if ($$.api.el) {
        $$.element = d3.select($$.api.el)
    }
    
    if ($$.element.empty()) {
        $$.element = d3.select(document.createElement('div')).style('opacity', 0)
    }
    $$.element.html("").classed("wtopology", true)

    $$.currentWidth = $$.getCurrentWidth()
    $$.currentHeight = $$.getCurrentHeight()

    $$.svgNode = $$.element.append('svg').classed('wtopology-svg', true)
        .attr('width', $$.currentWidth)
        .attr('width', $$.currentHeight)

    $$.nodeContainer = $$.svgNode.append('g')
        .attr('class', 'node_container')
    $$.linkContainer = $$.svgNode.append('g')
        .attr('class', 'link_container')
    $$.groupContainer = $$.svgNode.append('g')
        .attr('class', 'group_container')
    $$.bindResize()
}

/**
 * Binds handlers to the window resize event.
 */
TopologyChart.prototype.bindResize = function() {
    let $$ = this,
        configs = $$.configs

    $$.resizeFunction = $$.generateResize() // need to call .remove

    $$.resizeFunction.add(function() {
        configs.onresize.call($$)
    })
    if (configs.resize_auto) {
        $$.resizeFunction.add(function() {
            if ($$.resizeTimeout !== undefined) {
                window.clearTimeout($$.resizeTimeout)
            }
            $$.resizeTimeout = window.setTimeout(function() {
                delete $$.resizeTimeout
                $$.updateAndRedraw({
                })
                // if ($$.brush) {
                //     $$.brush.update()
                // }
            }, 100)
        })
    }
    $$.resizeFunction.add(function() {
        configs.onresized.call($$)
    })

    $$.resizeIfElementDisplayed = function() {
        // if element not displayed skip it
        if ($$.element == null || !$$.element.offsetParent) {
            return
        }

        $$.resizeFunction()
    }

    if (window.attachEvent) {
        window.attachEvent('onresize', $$.resizeIfElementDisplayed)
    } else if (window.addEventListener) {
        window.addEventListener('resize', $$.resizeIfElementDisplayed, false)
    } else {
        // fallback to this, if this is a very old browser
        var wrapper = window.onresize
        if (!wrapper) {
            // create a wrapper that will call all charts
            wrapper = $$.generateResize()
        } else if (!wrapper.add || !wrapper.remove) {
            // there is already a handler registered, make sure we call it too
            wrapper = $$.generateResize()
            wrapper.add(window.onresize)
        }
        // add this graph to the wrapper, we will be removed if the user calls destroy
        wrapper.add($$.resizeFunction)
        window.onresize = function() {
            // if element not displayed skip it
            if (!$$.element.offsetParent) {
                return
            }

            wrapper()
        }
    }
}

TopologyChart.prototype.generateResize = function() {
    let resizeFunctions = []

    function callResizeFunctions() {
        resizeFunctions.forEach(function(f) {
            f()
        })
    }
    callResizeFunctions.add = function(f) {
        resizeFunctions.push(f)
    }
    callResizeFunctions.remove = function(f) {
        for (let i = 0; i < resizeFunctions.length; i++) {
            if (resizeFunctions[i] === f) {
                resizeFunctions.splice(i, 1)
                break
            }
        }
    }
    return callResizeFunctions
}

export default TopologyChart
