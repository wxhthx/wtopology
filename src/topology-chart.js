export default function TopologyChart (api) {
    let $$ = this
    $$.d3 = window.d3 ? window.d3 : typeof require !== 'undefined' ? require("d3") : undefined;
    $$.api = api
    $$.customConfig = $$.api
    $$.configs = $$.getDefaultConfigs()
    $$.data = {}
    $$.initSvgContainer()
}