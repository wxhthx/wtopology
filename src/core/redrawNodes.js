import * as d3 from 'd3'

/**
 * @description redraw all nodes according to the defined node data
 * @param {*} dom 
 * @param {*} _nodes 
 * @param {*} _events 
 */
export default function redrawNodes (dom, _nodes, _events) {
    let nodes = dom.node_container.selectAll('g.node_object').data(_nodes, d => {
        return d.id
    })

    dom.nodeEnter = nodes.enter()
        .append('g')
        .attr('class', 'node_object')

    dom.nodeEnter.append('rect')
        .attr('width', 10)
        .attr('height', 10)
    
    dom.nodeUpdate = dom.nodeEnter.merge(nodes)
        .on('mouseover',  _events.node_mouseover)
        .on('mouseout', _events.node_mouseout)
        .on('mousedown', _events.node_mousedown)
    
    dom.nodeExit = nodes.exit().remove()
}