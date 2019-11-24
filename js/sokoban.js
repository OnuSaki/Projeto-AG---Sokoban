import Rect from "../js/class.js"

const canvas = document.querySelector('#canvas')
const context = canvas.getContext("2d")

const W = canvas.width
const H = canvas.height

const L = 30

const rect1 = new Rect(1, W / 2 + L / 2, H / 2 - L / 2, L, L)
const rect2 = new Rect(2, 150 + L / 2, 120 - L / 2, L, L)
const rects = []
rects.push(rect1, rect2,)


function playAgain() {
    let xChar = W / 2 - 15
    let yChar = H / 2 - 15

    let xRect = W / 2 + 15
    let yRect = H / 2 - 15

    function animate() {
        context.clearRect(0, 0, W, H);

        context.beginPath();
        context.fillStyle = 'white'
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.closePath();

        context.beginPath();
        context.fillStyle = 'blue';
        context.fill();
        context.closePath();
        context.fillRect(xChar, yChar, L, L);

        for (const rect of rects) {
            context.beginPath();
            context.fillStyle = 'black';
            context.fillRect(rect.xRect, rect.yRect, rect.L1, rect.L2);
            context.closePath();
        }

        window.requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener("keydown", e => {
        let isTouching = false
        let idRect = 0
        //tecla "seta para cima" ou tecla "W"
        if (e.key == "ArrowUp" || e.keyCode == "87") { 
            for (const rect of rects) {
                for (const rect of rects) {
                    if (xChar == rect.xRect && yChar == rect.yRect + L) {
                        isTouching = true
                        idRect = rect.id
                    }
                }
                if (isTouching && rect.id == idRect) {
                    yChar -= L
                    rect.yRect -= L
                    break
                } else if (idRect == 0) {
                    yChar -= L
                    break
                }
            }
        } 
        //tecla "seta para baixo" ou tecla "S"
        else if (e.key == "ArrowDown"|| e.keyCode == "83") { 
            for (const rect of rects) {
                for (const rect of rects) {
                    if (xChar == rect.xRect && yChar == rect.yRect - L) {
                        isTouching = true
                        idRect = rect.id
                    }
                }
                if (isTouching && rect.id == idRect) {
                    yChar += L
                    rect.yRect += L
                    break
                } else if (idRect == 0) {
                    yChar += L
                    break
                }
            }
        } 
        //tecla "seta para esquerda" ou tecla "A"
        else if (e.key == "ArrowLeft" || e.keyCode == "65") { 
            for (const rect of rects) {
                for (const rect of rects) {
                    if (xChar - L == rect.xRect && yChar == rect.yRect) {
                        isTouching = true
                        idRect = rect.id
                    }
                }
                if (isTouching && rect.id == idRect) {
                    xChar -= L
                    rect.xRect -= L
                    break
                } else if (idRect == 0) {
                    xChar -= L
                    break
                }
            }
        } 
        //tecla "seta para direita" ou tecla "D"
        else if (e.key == "ArrowRight" || e.keyCode == "68") { 
            for (const rect of rects) {
                for (const rect of rects) {
                    if (xChar + L == rect.xRect && yChar == rect.yRect) {
                        isTouching = true
                        idRect = rect.id
                    }
                }
                if (isTouching && rect.id == idRect) {
                    xChar += L
                    rect.xRect += L
                    break
                } else if (idRect == 0) {
                    xChar += L
                    break
                }
            }
        }
        //tecla "espaço"
        if (e.keyCode == "32") {
            playAgain()
        }
        //tecla "ctrl"
        if (e.keyCode == "17") {}
    })
}

playAgain()