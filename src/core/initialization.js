
import * as d3 from 'd3'
export default function render (options, data) {
    // const d3 = this.d3
    let _ele = document.querySelector(options.el)
    if (!_ele) {
        console.warn(`warn:does't has a defined dom element`)
        return
    }

    let width = 50, height = 50

    data.dom.svg = d3.select(_ele).append('svg')
        .attr('class', 'wtopology')
        .attr('width', width)
        .attr('height', height)

    data.dom.node_container = data.dom.svg.append('g')
        .attr('class', 'node_container')
    data.dom.link_container = data.dom.svg.append('g')
        .attr('class', 'link_container')
    data.dom.group_container = data.dom.svg.append('g')
        .attr('class', 'group_container')
}