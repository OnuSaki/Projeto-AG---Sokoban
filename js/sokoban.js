import Box from "../js/class.js"
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
const normalBox = "../img/normalBox.png"
const blueBox = "../img/blueBox.png"

//* Caixas quando se encontram no spot
const normalBoxOnSpot = "../img/normalOnSpot.png"
const blueBoxOnSpot = "../img/blueOnSpot.png"

//* Array com todas as caixas
let boxes = []
createBoxes()

//* Inicialização de todos os sprites do jogador
let char = new Image()
char.src = "../img/sprites_player.png"
let dir = 0

//* Incialização dos sprites 
let sprite = new Image()
const ground = "../img/ground.png"
const wall = "../img/wall.png"

//* Inicialização dos sprites dos spots
const spotNormal = "../img/spotNormal.png"
const spotBlue = "../img/spotBlue.png"

//* Nível
let level = 0
if (JSON.parse(localStorage.getItem("level"))) {
    level = JSON.parse(localStorage.getItem("level"))
} else {
    level = 1
}

//* Número de caixas no spot
let nBoxesOnSpot = 0

//?????????????????????????????????????????????????????????????????????????????????
function playAgain() {
    if (level < maps.length) {
        //* Mudar dimensões do canvas conforme o tamanho do nível
        canvas.width = maps[level - 1].map[0].length * 50
        canvas.height = maps[level - 1].map.length * 50

        offScreenCanvas.width = maps[level - 1].map[0].length * 50
        offScreenCanvas.height = maps[level - 1].map.length * 50

        W = canvas.width
        H = canvas.height

        //* Posição inicial do char
        let xChar = 0
        let yChar = 0

        for (let i = 0; i < maps[level - 1].map.length; i++) {
            for (let j = 0; j < maps[level - 1].map[i].length; j++) {
                if (maps[level - 1].map[i][j] == 4) {
                    xChar = j * 50
                    yChar = i * 50
                }
            }
        }

        //* Funcção de animação
        function animate() {
            //* Limpar o canvas
            context.clearRect(0, 0, W, H);
            offCanvas.clearRect(0, 0, W, H);

            //* Desenhar o mapa
            spawnMaps(level - 1);

            let image = offCanvas.getImageData(0, 0, W, H);
            context.putImageData(image, 0, 0);

            for (const box of boxes) {
                if (box.level == level) {
                    let boxImg = new Image()
                    boxImg.src = box.boxType
                    context.drawImage(boxImg, box.xBox, box.yBox, box.L, box.L);
                }
            }

            //* Desenhar o char
            context.drawImage(char, 0, dir * L, L, L, xChar, yChar, L, L);

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
                                yChar += L
                                box.yBox += L
                                checkBoxesOnSpots(idBox, xBoxPos, yBoxPos + 1)
                                break
                            }
                            break
                        } else if (idBox == 0) {
                            yChar += L
                            break
                        }
                    }
                }
                dir = 0
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
                                yChar -= L
                                box.yBox -= L
                                checkBoxesOnSpots(idBox, xBoxPos, yBoxPos - 1)
                                break
                            }
                            break
                        } else if (idBox == 0) {
                            yChar -= L
                            break
                        }
                    }
                }
                dir = 1
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
                                xChar -= L
                                box.xBox -= L
                                checkBoxesOnSpots(idBox, xBoxPos - 1, yBoxPos)
                                break
                            }
                            break
                        } else if (idBox == 0) {
                            xChar -= L
                            break
                        }
                    }
                }
                dir = 3
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
                                xChar += L
                                box.xBox += L
                                checkBoxesOnSpots(idBox, xBoxPos + 1, yBoxPos)
                                break
                            }
                            break
                        } else if (idBox == 0) {
                            xChar += L
                            break
                        }
                    }
                }
                dir = 2
            }

            //tecla "espaço"
            if (e.keyCode == "32") {
                nBoxesOnSpot = 0
                boxes = []
                createBoxes()
                playAgain()
            }
        })
    } else {
        canvas.width = 1000
        canvas.height = 300

        context.font = "5rem ArcadeClassic";
        context.textAlign = "center";
        context.fillStyle = 'white';
        context.fillText("Congratulations!", 500, 125);
        context.fillText("You passed all levels!", 500, 175);
    }
}

playAgain()

/**
 * ? "Desenhar" os mapas
 * @param {number} level 
 */
function spawnMaps(level) {
    for (let i = 0; i < maps[level].map.length; i++) {
        for (let j = 0; j < maps[level].map[i].length; j++) {
            if (maps[level].map[i][j] == 0 || maps[level].map[i][j] == 4) {
                sprite = new Image()
                sprite.src = ground
                offCanvas.drawImage(sprite, L * j, L * i, L, L);
            }
            if (maps[level].map[i][j] == 1) {
                sprite = new Image()
                sprite.src = ground
                offCanvas.drawImage(sprite, L * j, L * i, L, L);
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
        levelPassed()
    }
}

//TODO: FAZER ANIMAÇÃO PARA DEMONSTRAR QUE O UTILIZADOR PASSOU DE NÍVEL
function levelPassed() {
    level++
    alert("Parabéns, completou o nível!!!")
    localStorage.setItem("level", JSON.stringify(level))
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

    //* Boxes nível 3
    const box9 = new Box(9, 3, blueBox, 3 * 50, 2 * 50, L, false)
    const box10 = new Box(10, 3, blueBox, 3 * 50, 6 * 50, L, false)
    const box11 = new Box(11, 3, normalBox, 4 * 50, 3 * 50, L, false)
    const box12 = new Box(12, 3, normalBox, 4 * 50, 4 * 50, L, false)
    const box13 = new Box(13, 3, normalBox, 4 * 50, 6 * 50, L, false)
    const box14 = new Box(14, 3, normalBox, 5 * 50, 6 * 50, L, false)
    const box15 = new Box(15, 3, normalBox, 1 * 50, 6 * 50, L, false)

    //* Boxes nível 4
    const box16 = new Box(16, 4, normalBox, 10 * 50, 2 * 50, L, false)
    const box17 = new Box(17, 4, normalBox, 10 * 50, 3 * 50, L, false)
    const box18 = new Box(18, 4, normalBox, 10 * 50, 4 * 50, L, false)
    const box19 = new Box(19, 4, normalBox, 10 * 50, 5 * 50, L, false)
    const box20 = new Box(20, 4, normalBox, 10 * 50, 6 * 50, L, false)
    const box21 = new Box(21, 4, normalBox, 12 * 50, 2 * 50, L, false)
    const box22 = new Box(22, 4, normalBox, 13 * 50, 3 * 50, L, false)
    const box23 = new Box(23, 4, normalBox, 12 * 50, 4 * 50, L, false)
    const box24 = new Box(24, 4, normalBox, 13 * 50, 6 * 50, L, false)
    const box25 = new Box(25, 4, normalBox, 12 * 50, 7 * 50, L, false)
    const box26 = new Box(26, 4, normalBox, 9 * 50, 7 * 50, L, false)

    //* Boxes nível 5
    const box27 = new Box(27, 5, normalBox, 11 * 50, 2 * 50, L, false)
    const box28 = new Box(28, 5, normalBox, 14 * 50, 3 * 50, L, false)
    const box29 = new Box(29, 5, normalBox, 10 * 50, 5 * 50, L, false)
    const box30 = new Box(30, 5, normalBox, 13 * 50, 5 * 50, L, false)
    const box31 = new Box(31, 5, normalBox, 9 * 50, 6 * 50, L, false)
    const box32 = new Box(32, 5, normalBox, 11 * 50, 6 * 50, L, false)
    const box33 = new Box(33, 5, normalBox, 12 * 50, 6 * 50, L, false)
    const box34 = new Box(34, 5, normalBox, 9 * 50, 7 * 50, L, false)
    const box35 = new Box(35, 5, normalBox, 12 * 50, 7 * 50, L, false)
    const box36 = new Box(36, 5, normalBox, 11 * 50, 8 * 50, L, false)
    const box37 = new Box(37, 5, normalBox, 10 * 50, 9 * 50, L, false)
    const box38 = new Box(38, 5, normalBox, 12 * 50, 9 * 50, L, false)

    boxes.push(box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12, box13, box14, box15, box16, box17,
        box18, box19, box20, box21, box22, box23, box24, box25, box26, box27, box28, box29, box30, box31, box32, box33, box34,
        box35, box36, box37, box38)
}