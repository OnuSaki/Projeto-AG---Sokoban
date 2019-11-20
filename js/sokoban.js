import Rect from "../js/class.js"

const canvas = document.querySelector('#canvas')
const context = canvas.getContext("2d")

const W = canvas.width
const H = canvas.height

const L = 30

const rect1 = new Rect(1, W / 2 + L / 2, H / 2 - L / 2, L, L)
const rect2 = new Rect(2, 150 + L / 2, 120 - L / 2, L, L)
const rects = []
rects.push(rect1, rect2)


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
        if (e.key == "ArrowUp") {
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
        } else if (e.key == "ArrowDown") {
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
        } else if (e.key == "ArrowLeft") {
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
        } else {
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
        if (e.keyCode == "32") {
            playAgain()
        }
        if (e.keyCode == "17") {}
    })
}

playAgain()