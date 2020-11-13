class Vertex {
    constructor(index, adjacent) {
        this.index = index;
        this.adjacent = adjacent;
    }
}

let startGraph = easyGraph;// easyGraph - 3 вершина, smallGraph - 10 вершин, graph - 20 вершин
let vertexes = [];
let _compsub = []; // результат

Array.prototype.findIndexes = function (value) {
    let indexes = [];
    this.forEach((el, index) => {
        if(el !== value) return;
        indexes.push(index);
    })

    return [...indexes];
}

function notCondition(candidates, not) {
    let condition = true;
    not.forEach(v => {
        candidates.forEach(candidate => {
            if(v.adjacent.some(_v => _v === candidate.index)) {
                condition = false;
            }
        })
        if(condition) {
            return false;
        }
    })
    return true;
}

function findCandidate(_vertex) {
    let vertex = _vertex;
    return function (candidate) {
        let condition = candidate.index !== vertex.index;
        candidate.adjacent.forEach(v => {
            if (v === vertex.index) {
                condition = false;
            }
        })
        return condition;
    }
}
let counter = 0;
let result = [];
function BK (candidates, not) {
    let compsub = _compsub;
    while (candidates.length && notCondition(candidates, not) ) {
        let vertex = {...candidates[0]}
        compsub.push(vertex);
        let newNot = not.filter(findCandidate(vertex));
        let newCandidates = candidates.filter(findCandidate(vertex));
        if(!newCandidates.length && !newNot.length) {
            result.push([...compsub]);
            console.log('compsub: ', [...compsub]);
        } else {
            BK(newCandidates, newNot);
        }
        candidates.splice(candidates.findIndex(candidate => candidate.index === vertex.index), 1);
        compsub.splice(compsub.findIndex(el => el.index === vertex.index), 1);
        not.push(vertex);
    }
}

startGraph.forEach((v, i) => {
    let vertex = i;
    vertexes.push(new Vertex(vertex, v.findIndexes(1)))
})

BK(vertexes, []);
console.log('result', result);