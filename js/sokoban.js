import {
    Box,
    Spot
} from "../js/class.js"

import maps from "../js/maps.js"

const canvas = document.querySelector('#canvas')
const context = canvas.getContext("2d")

const W = canvas.width
const H = canvas.height

const L = 60

const boxes = []
// createBoxes()

const spots = []
// createSpots()

const spriteRight = "../img/Player/player_14.png"
const spriteLeft = "../img/Player/player_11.png"
const spriteUp = "../img/Player/player_02.png"
const spriteDown = "../img/Player/player_01.png"


let char = new Image()
char.src = "../img/Player/player_11.png"

let sprite = new Image()
const ground = "../img/Ground/ground_01.png"
const wall = "../img/Blocks/block_02.png"
const spot = "../img/Crates/crate_27.png"



function playAgain() {
    let xChar = W / 2 - 30
    let yChar = H / 2 - 30

    function animate() {
        context.beginPath();
        context.fillStyle = 'white'
        context.fillRect(0, 0, canvas.width, canvas.height)

        spawnMaps()

        // for (const spot of spots) {
        //     let spotImg = new Image()
        //     spotImg.src = spot.spotType
        //     context.drawImage(spotImg, spot.xSpot, spot.ySpot, L, L);
        // }

        // for (const box of boxes) {
        //     let boxImg = new Image()
        //     boxImg.src = box.boxType
        //     context.drawImage(boxImg, box.xBox, box.yBox, box.L, box.L);
        // }

        context.drawImage(char, xChar, yChar, L, L);

        window.requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener("keydown", e => {
        let isTouching = false
        let idBox = 0

        //Limite Inferior do Canvas
        if (yChar < 600) {
            //tecla "seta para baixo" ou tecla "S"
            if (e.key == "ArrowDown" || e.keyCode == "83") {
                for (const box of boxes) {
                    for (let i = 0; i < boxes.length; i++) {
                        for (let j = i + 1; j < boxes.length; j++) {
                            if ((boxes[i].xBox == boxes[j].xBox) && (boxes[i].yBox + L == boxes[j].yBox)) {
                                console.log('ola')
                            }
                        }
                    }
                    for (let i = 0; i < boxes.length; i++) {
                        if (xChar == boxes[i].xBox && yChar == boxes[i].yBox - L) {
                            isTouching = true
                            idBox = boxes[i].id
                        }
                    }
                    if (isTouching && box.id == idBox && box.canMove == true) {
                        yChar += L
                        box.yBox += L
                        break
                    } else if (idBox == 0) {
                        yChar += L
                        break
                    }
                }
            }
        }
        //Limite Superior do Canvas
        if (!yChar <= 0) {
            //tecla "seta para cima" ou tecla "W"
            if (e.key == "ArrowUp" || e.keyCode == "87") {
                for (const box of boxes) {
                    for (let i = 0; i < boxes.length; i++) {
                        for (let j = i + 1; j < boxes.length; j++) {
                            if ((boxes[i].xBox == boxes[j].xBox) && (boxes[i].yBox == boxes[j].yBox + L)) {
                                console.log('ola')
                            }
                        }
                    }
                    for (const box of boxes) {
                        if (xChar == box.xBox && yChar == box.yBox + L) {
                            isTouching = true
                            idBox = box.id
                        }
                    }
                    if (isTouching && box.id == idBox && box.canMove == true) {
                        yChar -= L
                        box.yBox -= L
                        break
                    } else if (idBox == 0) {
                        yChar -= L
                        break
                    }
                }
            }
        }
        //Limite Esquerdo do Canvas
        if (!((xChar <= 0 && yChar <= 0) || (xChar <= 0 && yChar >= 600) || (xChar <= 0))) {
            //tecla "seta para esquerda" ou tecla "A"
            if (e.key == "ArrowLeft" || e.keyCode == "65") {
                for (const box of boxes) {
                    for (let i = 0; i < boxes.length; i++) {
                        for (let j = i + 1; j < boxes.length; j++) {
                            if ((boxes[i].xBox == boxes[j].xBox + L) && (boxes[i].yBox == boxes[j].yBox)) {
                                console.log('ola')
                            }
                        }
                    }
                    for (const box of boxes) {
                        if (xChar - L == box.xBox && yChar == box.yBox) {
                            isTouching = true
                            idBox = box.id
                        }
                    }
                    if (isTouching && box.id == idBox && box.canMove == true) {
                        xChar -= L
                        box.xBox -= L
                        break
                    } else if (idBox == 0) {
                        xChar -= L
                        break
                    }
                }
            }
        }
        //Limite Direito do Canvas
        if (!((xChar >= 600 && yChar <= 0) || (xChar >= 600 && yChar >= 600) || (xChar >= 600))) {
            //tecla "seta para direita" ou tecla "D"
            if (e.key == "ArrowRight" || e.keyCode == "68") {
                for (const box of boxes) {
                    for (let i = 0; i < boxes.length; i++) {
                        for (let j = i + 1; j < boxes.length; j++) {
                            if ((boxes[i].xBox + L == boxes[j].xBox) && (boxes[i].yBox == boxes[j].yBox)) {
                                console.log('ola')
                            }
                        }
                    }
                    for (const box of boxes) {
                        if (xChar + L == box.xBox && yChar == box.yBox) {
                            isTouching = true
                            idBox = box.id
                        }
                    }
                    if (isTouching && box.id == idBox && box.canMove == true) {
                        xChar += L
                        box.xBox += L
                        break
                    } else if (idBox == 0) {
                        xChar += L
                        break
                    }
                }
            }
        }

        //tecla "espaço"
        if (e.keyCode == "32") {
            playAgain()
        }
        //tecla "ctrl"
        if (e.keyCode == "17") {

        }
        if (e.key == "ArrowLeft" || e.keyCode == "65") {
            char.src = spriteRight
        }
        if (e.key == "ArrowRight" || e.keyCode == "68") {
            char.src = spriteLeft
        }
        if (e.key == "ArrowUp" || e.keyCode == "87") {
            char.src = spriteUp
        }
        if (e.key == "ArrowDown" || e.keyCode == "83") {
            char.src = spriteDown
        }
    })
}

playAgain()

function createBoxes() {
    const normalBox = "../img/Crates/crate_02.png"
    const redBox = "../img/Crates/crate_03.png"
    const blueBox = "../img/Crates/crate_04.png"
    const greenBox = "../img/Crates/crate_05.png"
    const metalBox = "../img/Crates/crate_06.png"

    const box1 = new Box(1, normalBox, W / 2 + L / 2, H / 2 - L / 2, L, true)
    const box2 = new Box(2, normalBox, 180, 120, L, true)

    boxes.push(box1, box2)
}

function createSpots() {
    const spotNormalBox = "../img/Crates/crate_27.png"

    const spot1 = new Spot(1, spotNormalBox, 210, 240)

    spots.push(spot1)
}

function spawnMaps() {
    for (const map of maps) {
        context.translate(W / 2 - map.map.length / 2, H / 2 - map.map.length / 2);
        if (map.level == 1) {
            for (let i = 0; i < map.map.length; i++) {
                for (let j = 0; j < map.map.length; j++) {
                    if (map.map[i][j] == 0) {                       
                        sprite = new Image()
                        sprite.src = ground
                        context.drawImage(sprite, L * j, L * i, L, L);
                    }
                    if (map.map[i][j] == 1) {
                        sprite = new Image()
                        sprite.src = wall
                        context.drawImage(sprite, L * j, L * i, L, L);
                    }
                    if (map.map[i][j] == 2) {
                        sprite = new Image()
                        sprite.src = ground
                        context.drawImage(sprite, L * j, L * i, L, L);
                        sprite = new Image()
                        sprite.src = spot
                        context.drawImage(sprite, L * j, L * i, L, L);
                    }
                }
            }
        }
        context.restore();
    }
}