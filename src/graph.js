import TopologyChart from './core'

/**
 * @description redraw all nodes according to the defined node data
 * @param {*} dom 
 * @param {*} _nodes 
 * @param {*} _events 
 */
TopologyChart.prototype.redrawNodes = function (nodeSource = []) {
    let $$ = this, configs = $$.configs

    configs.node_mouseover.call($$.api.node_mouseover)
    let nodes = $$.nodeContainer.selectAll('g.node_object').data(nodeSource, d => {
        return d.id
    })

    $$.nodesEnter = nodes.enter()
        .append('g')
        .attr('class', 'node_object')

    $$.nodesEnter.append('rect')
        .attr('width', 10)
        .attr('height', 10)
    
    $$.nodesUpdate = $$.nodesEnter.merge(nodes)
        .on('mouseover',  configs.node_mouseover)
        .on('mouseout', configs.node_mouseout)
        .on('mousedown', configs.node_mousedown)
    
    nodes.exit().remove()
}