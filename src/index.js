import Initialization from './core/initialization'
import RedrawNodes from './core/redrawNodes'
import Config from './config/index'
import DomData from './data/dom'

let _component_data = {
    dom: {},
    nodes: [],
    links: []
}

function Wtopology (_options, _visuazationData) {
    this._options = _options
    this._visuazationData = _visuazationData
    this.initiazation()
    let config = new Config(_options).getConfig()
    Initialization(_options, _component_data)
    this.redrawNodes(_component_data.nodes)
}

/**
 * @description initialize dom constrcture
 * @author xinghua.wen
 */
Wtopology.prototype.initiazation = function (_visuazationData) {
    _component_data.dom = DomData.getData()
    if (this._visuazationData && this._visuazationData.nodes)
        _component_data.nodes = this._visuazationData.nodes
}

/**
 * @description redraw all nodes of the topology
 * @author xinghua.wen
 */
Wtopology.prototype.redrawNodes = function (nodes) {
    RedrawNodes(_component_data.dom, nodes, this._options.events)
}
export default Wtopology
