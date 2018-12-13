const DATA = {
    svg: {},
    nodes: [],
    nodeUpdate: [],
    nodeExit: []
}

class DomData {
    constructor () {
        this.data = DATA
    }

    getData () {
        return this.data
    }
}

export default new DomData()
