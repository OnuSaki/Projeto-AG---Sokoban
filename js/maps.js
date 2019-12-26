class Map {
    constructor(level, map) {
        this.level = level
        this.map = map
    }
    // draw(){
    //     for (let i = 0; i < this.map.length; i++) {
    //         for (let j = 0; j < this.map.length; j++) {
    //             if (this.map[i,j] == 1) {

    //             }
    //         }
    //     }
    // }
}


/**
 *  0 - chão
 *  1 - parede
 *  2 - spot Normal
 *  3 - spot Azul
 */

const map1 = new Map(1, [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
])

const map2 = new Map(2, [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
])


const maps = []
maps.push(map1, map2)
export default maps