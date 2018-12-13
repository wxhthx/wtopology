function node_mouseover (d) {
    console.log(d)
}
window.onload = function () {
    let _wtopotogy = new wtopology({el: '.topotogy-svg', events: {node_mouseover: node_mouseover}}, {nodes: [{id: '1'}, {id: '2'}]})
    // let _wtopotogy1 = new wtopology({el: '.topotogy-svg1'})
    setTimeout(
        () => {
            _wtopotogy.redrawNodes([{id: '123'}, {id: '234'}])
        }, 30000
    )
}