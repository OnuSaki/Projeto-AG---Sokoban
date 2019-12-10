export class Box {
    constructor(id, boxType, xBox, yBox, L) {
        this.id = id
        this.boxType = boxType
        this.xBox = xBox
        this.yBox = yBox
        this.L = L
    }
}

export class Spot {
    constructor(id, xSpot, ySpot) {
        this.id = id
        this.xSpot = xSpot
        this.ySpot = ySpot
    }
}