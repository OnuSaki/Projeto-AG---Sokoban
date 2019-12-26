import {
    Box,
    Spot
} from "../js/class.js"

import maps from "../js/maps.js"

//* Buscar a tag canvas ao html
const canvas = document.querySelector('#canvas')
const context = canvas.getContext("2d")

//* Dimensões do canvas
const W = canvas.width
const H = canvas.height

//* Tamanho de todos 
const L = 60

//* Array com todas as caixas
const boxes = []
createBoxes()

//* Array com todos os spots
const spots = []
// createSpots()

//* Inicialização de todos os sprites do jogador
const spriteRight = "../img/Player/player_14.png"
const spriteLeft = "../img/Player/player_11.png"
const spriteUp = "../img/Player/player_02.png"
const spriteDown = "../img/Player/player_01.png"

let char = new Image()
char.src = spriteLeft

//* Incialização dos sprites 
let sprite = new Image()
const ground = "../img/Ground/ground_01.png"
const wall = "../img/Blocks/block_02.png"
const spot = "../img/Crates/crate_27.png"

//* Nível
let level = 1

function playAgain() {
    //* Posição inicial do char
    let xChar = W / 2 - 30
    let yChar = H / 2 - 30

    // console.log(maps[level - 1].map[0].length);
    // console.log(maps[level - 1].map.length);

    //* Mudar dimensões do canvas conforme o tamanho do nível
    canvas.width = maps[level - 1].map[0].length * 60
    canvas.height = maps[level - 1].map.length * 60

    //* Funcção de animação
    function animate() {
        //* Limpar o canvas
        context.beginPath();
        context.fillStyle = 'white'
        context.fillRect(0, 0, canvas.width, canvas.height)

        //* Desenhar o mapa
        spawnMaps(level - 1)

        // for (const spot of spots) {
        //     let spotImg = new Image()
        //     spotImg.src = spot.spotType
        //     context.drawImage(spotImg, spot.xSpot, spot.ySpot, L, L);
        // }

        for (const box of boxes) {
            let boxImg = new Image()
            boxImg.src = box.boxType
            context.drawImage(boxImg, box.xBox, box.yBox, box.L, box.L);
        }

        //* Desenhar o char
        context.drawImage(char, xChar, yChar, L, L);

        window.requestAnimationFrame(animate)
    }
    animate()

    //* Eventos de deteção do movimento do jogador
    window.addEventListener("keydown", e => {
        let isTouching = false
        let idBox = 0

        //Limite Inferior do Canvas
        if (yChar < 600) {
            //tecla "seta para baixo" ou tecla "S"
            if (e.key == "ArrowDown" || e.keyCode == "83") {
                for (const box of boxes) {
                    for (let i = 0; i < boxes.length; i++) {
                        if (xChar == boxes[i].xBox && yChar == boxes[i].yBox - L) {
                            isTouching = true
                            idBox = boxes[i].id
                        }
                    }
                    //* Obter posições no array onde se encontra o player
                    let xCharPos = xChar / 60
                    let yCharPos = yChar / 60
                    //* Verificação se no caminho do player se encontra parede
                    if (maps[level - 1].map[yCharPos + 1][xCharPos] != 1) {
                        if (isTouching && box.id == idBox && box.canMove == true) {
                            let xBoxPos = box.xBox / 60
                            let yBoxPos = box.yBox / 60
                            if (maps[level - 1].map[yBoxPos + 1][xBoxPos] != 1) {
                                yChar += L
                                box.yBox += L
                                break
                            }
                        } else if (idBox == 0) {
                            yChar += L
                            break
                        }
                    }
                }
            }
        }
        //Limite Superior do Canvas
        if (!yChar <= 0) {
            //tecla "seta para cima" ou tecla "W"
            if (e.key == "ArrowUp" || e.keyCode == "87") {
                for (const box of boxes) {
                    for (const box of boxes) {
                        if (xChar == box.xBox && yChar == box.yBox + L) {
                            isTouching = true
                            idBox = box.id
                        }
                    }

                    let xCharPos = xChar / 60
                    let yCharPos = yChar / 60
                    if (maps[level - 1].map[yCharPos - 1][xCharPos] != 1) {
                        if (isTouching && box.id == idBox && box.canMove == true) {
                            let xBoxPos = box.xBox / 60
                            let yBoxPos = box.yBox / 60
                            if (maps[level - 1].map[yBoxPos - 1][xBoxPos] != 1) {
                                yChar -= L
                                box.yBox -= L
                                break
                            }
                        } else if (idBox == 0) {
                            yChar -= L
                            break
                        }
                    }
                }
            }
        }
        //Limite Esquerdo do Canvas
        if (!((xChar <= 0 && yChar <= 0) || (xChar <= 0 && yChar >= 600) || (xChar <= 0))) {
            //tecla "seta para esquerda" ou tecla "A"
            if (e.key == "ArrowLeft" || e.keyCode == "65") {
                for (const box of boxes) {
                    for (const box of boxes) {
                        if (xChar - L == box.xBox && yChar == box.yBox) {
                            isTouching = true
                            idBox = box.id
                        }
                    }
                    let xCharPos = xChar / 60
                    let yCharPos = yChar / 60
                    if (maps[level - 1].map[yCharPos][xCharPos - 1] != 1) {
                        if (isTouching && box.id == idBox && box.canMove == true) {
                            let xBoxPos = box.xBox / 60
                            let yBoxPos = box.yBox / 60
                            if (maps[level - 1].map[yBoxPos][xBoxPos - 1] != 1) {
                                xChar -= L
                                box.xBox -= L
                                break
                            }
                        } else if (idBox == 0) {
                            xChar -= L
                            break
                        }
                    }
                }
            }
        }
        //Limite Direito do Canvas
        if (!((xChar >= 600 && yChar <= 0) || (xChar >= 600 && yChar >= 600) || (xChar >= 600))) {
            //tecla "seta para direita" ou tecla "D"
            if (e.key == "ArrowRight" || e.keyCode == "68") {
                for (const box of boxes) {
                    for (const box of boxes) {
                        if (xChar + L == box.xBox && yChar == box.yBox) {
                            isTouching = true
                            idBox = box.id
                        }
                    }
                    let xCharPos = xChar / 60
                    let yCharPos = yChar / 60
                    if (maps[level - 1].map[yCharPos][xCharPos + 1] != 1) {
                        if (isTouching && box.id == idBox && box.canMove == true) {
                            let xBoxPos = box.xBox / 60
                            let yBoxPos = box.yBox / 60
                            if (maps[level - 1].map[yBoxPos][xBoxPos + 1] != 1) {
                                xChar += L
                                box.xBox += L
                                break
                            }
                        } else if (idBox == 0) {
                            xChar += L
                            break
                        }
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

    //* Boxes nível 1
    const box1 = new Box(1, 1, normalBox, 2 * 60, 4 * 60, L, true)
    const box2 = new Box(2, 1, normalBox, 4 * 60, 2 * 60, L, true)

    boxes.push(box1, box2)
}

function createSpots() {
    const spotNormalBox = "../img/Crates/crate_27.png"

    const spot1 = new Spot(1, spotNormalBox, 210, 240)

    spots.push(spot1)
}

function spawnMaps(level) {
    for (let i = 0; i < maps[level].map.length; i++) {
        for (let j = 0; j < maps[level].map.length; j++) {
            if (maps[level].map[i][j] == 0) {
                sprite = new Image()
                sprite.src = ground
                context.drawImage(sprite, L * j, L * i, L, L);
            }
            if (maps[level].map[i][j] == 1) {
                sprite = new Image()
                sprite.src = wall
                context.drawImage(sprite, L * j, L * i, L, L);
            }
            if (maps[level].map[i][j] == 2) {
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