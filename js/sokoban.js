import {
    Box
} from "../js/class.js"

const canvas = document.querySelector('#canvas')
const context = canvas.getContext("2d")

const W = canvas.width
const H = canvas.height

const L = 30

const boxes = []

const box1 = new Box(1, "../img/Crates/crate_42.png", W / 2 + L / 2, H / 2 - L / 2, L)
const box2 = new Box(2, "../img/Crates/crate_42.png", 165 + L / 2, 135 - L / 2, L)

boxes.push(box1, box2)

let char = new Image()
char.src = "../img/Player/player_11.png"


function playAgain() {
    let xChar = W / 2 - 15
    let yChar = H / 2 - 15

    function animate() {
        context.beginPath();
        context.fillStyle = 'white'
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.drawImage(char, xChar, yChar, L, L);

        for (const box of boxes) {
            let boxImg = new Image()
            boxImg.src = box.boxType
            context.drawImage(boxImg, box.xBox, box.yBox, box.L, box.L);
        }

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
                    if (isTouching && box.id == idBox) {
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
                    if (isTouching && box.id == idBox) {
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
                    if (isTouching && box.id == idBox) {
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
                    if (isTouching && box.id == idBox) {
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

    })
}

playAgain()