class Map {
    constructor(level, map) {
        this.level = level
        this.map = map
    }
}


/**
 *  0 - chão
 *  1 - parede
 *  2 - spot Normal
 *  3 - spot Azul
 *  4 - player
 *  5 - nada
 */

const map1 = new Map(1, [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 4, 1],
    [1, 1, 1, 1, 1, 1, 1]
])

const map2 = new Map(2, [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
])

const map3 = new Map(3, [
    [5, 5, 1, 1, 1, 1, 1, 5],
    [1, 1, 1, 0, 0, 0, 1, 5],
    [1, 3, 4, 0, 0, 0, 1, 5],
    [1, 1, 1, 0, 0, 2, 1, 5],
    [1, 2, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 0, 2, 0, 1, 1],
    [1, 0, 0, 3, 0, 0, 2, 1],
    [1, 0, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
])

const map4 = new Map(4, [
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0, 4, 1, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0, 1, 0, 0, 1, 1, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0, 1, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 0, 0, 0, 0, 1, 5, 5],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
    [1, 2, 2, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5]
])

const map5 = new Map(5, [
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 1, 0, 1, 1, 0, 0, 1],
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 2, 2, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5],
    [1, 2, 2, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 4, 1, 5],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0, 0, 1, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 0, 1, 1, 0, 1, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0, 1, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5],
])


const maps = []
maps.push(map1, map2, map3, map4, map5)
export default maps