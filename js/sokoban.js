import {
    Box
} from "../js/class.js"

import maps from "../js/maps.js"

//* Buscar a tag canvas ao html
const canvas = document.querySelector('#canvas')
const context = canvas.getContext("2d")

//* Dimensões do canvas
let W = canvas.width
let H = canvas.height

const offScreenCanvas = document.createElement('canvas')
const offCanvas = offScreenCanvas.getContext("2d")

//* Tamanho de todos 
const L = 50

//* Tipos de caixas possíveis
const normalBox = "../img/Crates/crate_02.png"
const redBox = "../img/Crates/crate_03.png"
const blueBox = "../img/Crates/crate_04.png"
const greenBox = "../img/Crates/crate_05.png"
const metalBox = "../img/Crates/crate_06.png"

//* Caixas quando se encontram no spot
const normalBoxOnSpot = "../img/Crates/crate_12.png"
const blueBoxOnSpot = "../img/Crates/crate_14.png"

//* Array com todas as caixas
let boxes = []
createBoxes()

//* Inicialização de todos os sprites do jogador
// const spriteRight = "../img/Player/player_14.png"
// const spriteLeft = "../img/Player/player_11.png"
// const spriteUp = "../img/Player/player_02.png"
// const spriteDown = "../img/Player/player_01.png"

let char = new Image()
char.src = "../img/sprites_player.png"
let dir = 0
let pos = 0
// let moving = false
// let posMov = 1
// let dirMov = ""
// let idBoxMov = 0
// let outOfBounds = true

let unableToPress = false

//* Incialização dos sprites 
let sprite = new Image()
const ground = "../img/Ground/ground_01.png"
const wall = "../img/Blocks/block_02.png"

//* Inicialização dos sprites dos spots
const spotNormal = "../img/Crates/crate_27.png"
const spotBlue = "../img/Crates/crate_29.png"

//* Nível
let level = 0
if (sessionStorage.getItem("level")) {
    level = sessionStorage.getItem("level")
} else {
    level = 1
}


//* Número de caixas no spot
let nBoxesOnSpot = 0

//?????????????????????????????????????????????????????????????????????????????????
function playAgain() {
    //* Mudar dimensões do canvas conforme o tamanho do nível
    canvas.width = maps[level - 1].map[0].length * 50
    canvas.height = maps[level - 1].map.length * 50

    offScreenCanvas.width = maps[level - 1].map[0].length * 50
    offScreenCanvas.height = maps[level - 1].map.length * 50

    W = canvas.width
    H = canvas.height

    //* Posição inicial do char
    let xChar = (maps[level - 1].map[0].length - 2) * 50
    let yChar = (maps[level - 1].map.length - 2) * 50

    //* Funcção de animação
    function animate() {
        //* Limpar o canvas
        context.clearRect(0, 0, W, H);
        offCanvas.clearRect(0, 0, W, H);

        //* Desenhar o mapa
        spawnMaps(level - 1)

        for (const box of boxes) {
            if (box.level == level) {
                let boxImg = new Image()
                boxImg.src = box.boxType
                offCanvas.drawImage(boxImg, box.xBox, box.yBox, box.L, box.L);
            }
        }

        //* Desenhar o char
        offCanvas.drawImage(char, pos * L, dir * L, L, L, xChar, yChar, L, L);
        //playerMovement(dirMov, idBoxMov, outOfBounds)

        let image = offCanvas.getImageData(0, 0, W, H)
        context.putImageData(image, 0, 0);

        window.requestAnimationFrame(animate)
    }
    animate()

    //* Eventos de deteção do movimento do jogador
    window.addEventListener("keydown", e => {
        let isTouching = false
        let idBox = 0

        //* Obter posições no array onde se encontra o player
        let xCharPos = xChar / 50
        let yCharPos = yChar / 50


        if (unableToPress == false) {
            //tecla "seta para baixo" ou tecla "S"
            if (e.key == "ArrowDown" || e.keyCode == "83") {
                for (const box of boxes) {
                    for (const box of boxes) {
                        if (xChar == box.xBox && yChar == box.yBox - L && box.level === level) {
                            isTouching = true
                            idBox = box.id
                            break
                        }
                    }
                    //* Verificação se no caminho do player se encontra parede
                    if (maps[level - 1].map[yCharPos + 1][xCharPos] != 1) {
                        if (isTouching && box.id == idBox && boxesColision(box.xBox, box.yBox + L)) {
                            let xBoxPos = box.xBox / 50
                            let yBoxPos = box.yBox / 50
                            if (maps[level - 1].map[yBoxPos + 1][xBoxPos] != 1) {
                                // moving = true
                                // dirMov = "down"
                                // idBoxMov = idBox
                                // outOfBounds = false
                                // unableToPress = true
                                yChar += L
                                box.yBox += L
                                checkBoxesOnSpots(idBox, xBoxPos, yBoxPos + 1)
                                break
                            }
                            break
                        } else if (idBox == 0) {
                            // moving = true
                            // dirMov = "down"
                            // idBoxMov = idBox
                            // outOfBounds = false
                            // unableToPress = true
                            yChar += L
                            break
                        }
                    }
                }
                dir = 0
                pos = 0
            }

            //tecla "seta para cima" ou tecla "W"
            if (e.key == "ArrowUp" || e.keyCode == "87") {
                for (const box of boxes) {
                    for (const box of boxes) {
                        if (xChar == box.xBox && yChar == box.yBox + L && box.level === level) {
                            isTouching = true
                            idBox = box.id
                            break
                        }
                    }
                    if (maps[level - 1].map[yCharPos - 1][xCharPos] != 1) {
                        if (isTouching && box.id == idBox && boxesColision(box.xBox, box.yBox - L)) {
                            let xBoxPos = box.xBox / 50
                            let yBoxPos = box.yBox / 50
                            if (maps[level - 1].map[yBoxPos - 1][xBoxPos] != 1) {
                                // moving = true
                                // dirMov = "up"
                                // idBoxMov = idBox
                                // outOfBounds = false
                                // unableToPress = true
                                yChar -= L
                                box.yBox -= L
                                checkBoxesOnSpots(idBox, xBoxPos, yBoxPos - 1)
                                break
                            }
                            break
                        } else if (idBox == 0) {
                            // moving = true
                            // dirMov = "up"
                            // idBoxMov = idBox
                            // outOfBounds = false
                            // unableToPress = true
                            yChar -= L
                            break
                        }
                    }
                }
                dir = 1
                pos = 0
            }

            //tecla "seta para esquerda" ou tecla "A"
            if (e.key == "ArrowLeft" || e.keyCode == "65") {
                for (const box of boxes) {
                    for (const box of boxes) {
                        if (box.level == level) {
                            if (xChar - L == box.xBox && yChar == box.yBox && box.level === level) {
                                isTouching = true
                                idBox = box.id
                                break
                            }
                        }
                    }
                    if (maps[level - 1].map[yCharPos][xCharPos - 1] != 1) {
                        if (isTouching && box.id == idBox && boxesColision(box.xBox - L, box.yBox)) {
                            let xBoxPos = box.xBox / 50
                            let yBoxPos = box.yBox / 50
                            if (maps[level - 1].map[yBoxPos][xBoxPos - 1] != 1) {
                                // moving = true
                                // dirMov = "left"
                                // idBoxMov = idBox
                                // outOfBounds = false
                                // unableToPress = true
                                xChar -= L
                                box.xBox -= L
                                checkBoxesOnSpots(idBox, xBoxPos - 1, yBoxPos)
                                break
                            }
                            break
                        } else if (idBox == 0) {
                            // moving = true
                            // dirMov = "left"
                            // idBoxMov = idBox
                            // outOfBounds = false
                            // unableToPress = true
                            xChar -= L
                            break
                        }
                    }
                }
                dir = 3
                pos = 0
            }

            //tecla "seta para direita" ou tecla "D"
            if (e.key == "ArrowRight" || e.keyCode == "68") {
                for (const box of boxes) {
                    for (const box of boxes) {
                        if (xChar + L == box.xBox && yChar == box.yBox && box.level === level) {
                            isTouching = true
                            idBox = box.id
                            break
                        }
                    }
                    if (maps[level - 1].map[yCharPos][xCharPos + 1] != 1) {
                        if (isTouching && box.id == idBox && boxesColision(box.xBox + L, box.yBox)) {
                            let xBoxPos = box.xBox / 50
                            let yBoxPos = box.yBox / 50
                            if (maps[level - 1].map[yBoxPos][xBoxPos + 1] != 1) {
                                // moving = true
                                // dirMov = "right"
                                // idBoxMov = idBox
                                // outOfBounds = false
                                // unableToPress = true
                                xChar += L
                                box.xBox += L
                                checkBoxesOnSpots(idBox, xBoxPos + 1, yBoxPos)
                                break
                            }
                            break
                        } else if (idBox == 0) {
                            // moving = true
                            // dirMov = "right"
                            // idBoxMov = idBox
                            // outOfBounds = false
                            // unableToPress = true
                            xChar += L
                            break
                        }
                    }
                }
                dir = 2
                pos = 0
            }

            //tecla "espaço"
            if (e.keyCode == "32") {
                nBoxesOnSpot = 0
                boxes = []
                createBoxes()
                playAgain()
            }
        }
    })

    // function playerMovement(direction, boxId) {
    //     if (moving && outOfBounds == false) {
    //         if (posMov == 2 || posMov == 4 || posMov == 6) {
    //             pos = 0
    //         } else if (posMov == 1 || posMov == 5) {
    //             pos = 1
    //         } else if (posMov == 3) {
    //             pos = 2
    //         }
    //         if (direction == "up") {
    //             if (posMov % 2 != 0 && posMov != 1)
    //                 yChar -= 9
    //             else
    //                 yChar -= 8
    //             if (boxId != 0) {
    //                 if (posMov % 2 != 0 && posMov != 1)
    //                     boxes[boxId - 1].yBox -= 9
    //                 else
    //                     boxes[boxId - 1].yBox -= 8
    //             }
    //         }
    //         if (direction == "down") {
    //             if (posMov % 2 != 0 && posMov != 1)
    //                 yChar += 9
    //             else
    //                 yChar += 8
    //             if (boxId != 0) {
    //                 if (posMov % 2 != 0 && posMov != 1)
    //                     boxes[boxId - 1].yBox += 9
    //                 else
    //                     boxes[boxId - 1].yBox += 8
    //             }
    //         }
    //         if (direction == "left") {
    //             if (posMov % 2 != 0 && posMov != 1)
    //                 xChar -= 9
    //             else
    //                 xChar -= 8
    //             if (boxId != 0) {
    //                 if (posMov % 2 != 0 && posMov != 1)
    //                     boxes[boxId - 1].xBox -= 9
    //                 else
    //                     boxes[boxId - 1].xBox -= 8
    //             }
    //         }
    //         if (direction == "right") {
    //             if (posMov % 2 != 0 && posMov != 1)
    //                 xChar += 9
    //             else
    //                 xChar += 8
    //             if (boxId != 0) {
    //                 if (posMov % 2 != 0 && posMov != 1)
    //                     boxes[boxId - 1].xBox += 9
    //                 else
    //                     boxes[boxId - 1].xBox += 8
    //             }
    //         }
    //         posMov += 1
    //         if (posMov == 7) {
    //             moving = false
    //             posMov = 1
    //             outOfBounds = true
    //             unableToPress = false
    //         }
    //         console.log(yChar);
    //         console.log(xChar);
    //     }
    // }
}

playAgain()

/**
 * ? "Desenhar" os mapas
 * @param {number} level 
 */
function spawnMaps(level) {
    for (let i = 0; i < maps[level].map.length; i++) {
        for (let j = 0; j < maps[level].map[0].length; j++) {
            if (maps[level].map[i][j] == 0) {
                sprite = new Image()
                sprite.src = ground
                offCanvas.drawImage(sprite, L * j, L * i, L, L);
            }
            if (maps[level].map[i][j] == 1) {
                sprite = new Image()
                sprite.src = wall
                offCanvas.drawImage(sprite, L * j, L * i, L, L);
            }
            if (maps[level].map[i][j] == 2) {
                sprite = new Image()
                sprite.src = ground
                offCanvas.drawImage(sprite, L * j, L * i, L, L);
                sprite = new Image()
                sprite.src = spotNormal
                offCanvas.drawImage(sprite, L * j, L * i, L, L);
            }
            if (maps[level].map[i][j] == 3) {
                sprite = new Image()
                sprite.src = ground
                offCanvas.drawImage(sprite, L * j, L * i, L, L);
                sprite = new Image()
                sprite.src = spotBlue
                offCanvas.drawImage(sprite, L * j, L * i, L, L);
            }
        }
    }
}

/**
 * ? Verificação se duas caixas estão em colisão
 * @param {number} x 
 * @param {number} y 
 */
function boxesColision(x, y) {
    for (const box of boxes) {
        if (box.xBox == x && box.yBox == y) {
            if (box.level == level) {
                return false
            }
        }
    }
    return true
}

/**
 * ? Verificação se as caixas se encontram nos spots
 * TODO: FAZER VERIFICAÇÃO SE TODAS JÁ ESTÃO NO SPOT
 * @param {number} boxId    
 * @param {number} x 
 * @param {number} y 
 */
function checkBoxesOnSpots(boxId, x, y) {
    let sum = boxes.filter(box => box.level == level)
    for (const box of boxes) {
        if (box.id == boxId) {
            if (box.boxType == normalBox || box.boxType == normalBoxOnSpot) {
                if (maps[level - 1].map[y][x] === 2) {
                    if (box.onSpot == false) {
                        nBoxesOnSpot++
                    }
                    box.onSpot = true
                    box.boxType = normalBoxOnSpot
                } else if (box.onSpot && maps[level - 1].map[y][x] != 2) {
                    box.boxType = normalBox
                    box.onSpot = false
                    nBoxesOnSpot--
                }
            }
            if (box.boxType == blueBox || box.boxType == blueBoxOnSpot) {
                if (maps[level - 1].map[y][x] === 3) {
                    if (box.onSpot == false) {
                        nBoxesOnSpot++
                    }
                    box.onSpot = true
                    box.boxType = blueBoxOnSpot
                } else if (box.onSpot && maps[level - 1].map[y][x] != 3) {
                    box.boxType = blueBox
                    box.onSpot = false
                    nBoxesOnSpot--
                }
            }
        }
    }
    console.log(nBoxesOnSpot);

    if (nBoxesOnSpot === sum.length) {
        nBoxesOnSpot = 0
        // moving = false
        sessionStorage.setItem("level", level)
        levelPassed()
    }
}

//TODO: FAZER ANIMAÇÃO PARA DEMONSTRAR QUE O UTILIZADOR PASSOU DE NÍVEL
function levelPassed() {
    level++
    alert("Parabéns, completou o nível!!!")
    playAgain()
}

/**
 *? Criação de caixas
 */
function createBoxes() {
    //* Boxes nível 1
    const box1 = new Box(1, 1, normalBox, 2 * 50, 4 * 50, L, false)
    const box2 = new Box(2, 1, normalBox, 4 * 50, 2 * 50, L, false)

    //* Boxes nível 2
    const box3 = new Box(3, 2, normalBox, 3 * 50, 2 * 50, L, false)
    const box4 = new Box(4, 2, normalBox, 3 * 50, 6 * 50, L, false)
    const box5 = new Box(5, 2, normalBox, 4 * 50, 6 * 50, L, false)
    const box6 = new Box(6, 2, normalBox, 9 * 50, 7 * 50, L, false)
    const box7 = new Box(7, 2, blueBox, 8 * 50, 5 * 50, L, false)
    const box8 = new Box(8, 2, blueBox, 5 * 50, 2 * 50, L, false)

    boxes.push(box1, box2, box3, box4, box5, box6, box7, box8)
}