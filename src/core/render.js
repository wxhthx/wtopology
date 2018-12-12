
import d3 from 'd3'
export default function render (options) {
    // const d3 = this.d3
    let _ele = document.querySelector(options.el)
    if (!_ele) {
        console.warn(`warn:does't has a defined dom element`)
        return
    }

    let width = 50, height = 50

    let svg = d3.select(_ele).append('svg')
        .attr('class', 'wtopology')
        .attr('width', width)
        .attr('height', height)
}