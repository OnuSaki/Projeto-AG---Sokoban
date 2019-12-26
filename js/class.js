export class Box {
    constructor(id, level, boxType, xBox, yBox, L, canMove) {
        this.id = id
        this.level = level
        this.boxType = boxType
        this.xBox = xBox
        this.yBox = yBox
        this.L = L
        this.canMove = canMove
    }
}

export class Spot {
    constructor(id, spotType, xSpot, ySpot) {
        this.id = id
        this.spotType = spotType
        this.xSpot = xSpot
        this.ySpot = ySpot
    }
}