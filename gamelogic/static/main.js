const cells = document.querySelectorAll('.cells')
const backBtn = document.getElementById('back-btn')
const resetBtn = document.getElementById('reset-btn')
const restartBtn = document.getElementById('restart-btn')
const continueBtn = document.getElementById('continue-btn')
const replayBtn = document.getElementById('replay-btn')
const tryAgainBtn = document.getElementById('try-again-btn')
const quitBtn = document.getElementById('quit-btn')
const quitBox = document.getElementById('quit-box')
const winBox = document.getElementById('win-box')
const lostBox = document.getElementById('lost-box')
const Board = document.getElementById('board')
const scoreCard = document.getElementById('score')
const highScoreCard = document.getElementById('high-score')

const btns = [resetBtn, backBtn, quitBtn]
const colorPalette = {
    2: 60, 4: 50, 8: 40, 16: 30, 32: 20, 64: 10, 128: 70, 256: 80, 512: 90, 1024: 0, 2028: 100
}

let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

let prevState = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

let score = 0
let highScore = score
let prevScore = score

window.addEventListener('keydown', async function(e) {
    if (quitBtn.disabled === false) {
        if (e.keyCode === 8) {
            backBtn.click()
            return
        } else if (e.keyCode === 36) {
            resetBtn.click()
            return
        } else if (e.keyCode === 27) {
            quitBtn.click()
            return
        }
        prevState = await getPrevState(prevState, board)
        key = e.keyCode
        // console.log(key)
        prevScore = await score
        if (key === 37 || key === 65) {
            for (let i=0; i<board.length; i++) {
                score += shiftingValuesToLeft(board[i])
            }
        } else if (key === 38 || key === 87) {
            board = transpose(board)
            for (let i=0; i<board.length; i++) {
                score += shiftingValuesToLeft(board[i])
            }
            board = transpose(board)
        } else if (key === 39 || key === 68) {
            for (let i=0; i<board.length; i++) {
                score += shiftingValuesToRight(board[i]) 
            }
        } else if (key === 40 || key === 83) {
            board = transpose(board)
            for (let i=0; i<board.length; i++) {
                score += shiftingValuesToRight(board[i])
            }
            board = transpose(board)
        } else {
            return
        }
        let cont = toContinue(board, prevState)
        if (cont === false) return
        if (checkWin(board) === true) {
            Congratulation()
            return
        }
        // } else if (checkLoss(board, score, prevScore) === true) {
        //     tryAgain()
        //     return
        // }
        board = generateAnotherNumInRandomEmptyCell(board)
        updateBoard(board)
        if (score > highScore) {
            highScore = score
        }
        updateScoreCard(score, highScore)
    } else if (winBox.style.display === 'initial') {
        if (e.keyCode === 13) {
            replayBtn.click()
        }
    } else if (lostBox.style.display === 'initial') {
        if (e.keyCode === 13) {
            tryAgainBtn.click()
        }
    } else {
        if (e.keyCode === 36) {
            board = resetBoard(board)
            updateBoard(board)
            restartBtn.click()
        } else if (e.keyCode === 13) {
            continueBtn.click()
        }
    }
})

backBtn.addEventListener('click', function() {
    // console.log(prevState)
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            board[i][j] = prevState[i][j]
        }
    }
    updateBoard(board)
})

resetBtn.addEventListener('click', function() {
    board = resetBoard(board)
    updateBoard(board)
    score = 0
    updateBoard(0, highScore)
})

quitBtn.addEventListener('click', function() {
    quitBox.style.display = 'initial'
    quitBox.style.height = `${parseInt(Board.offsetHeight)}px`
    quitBox.style.width = `${parseInt(Board.offsetWidth)}px`
    btns.forEach(btn => {
        btn.disabled = true
    })
})

restartBtn.addEventListener('click', function() {
    quitBox.style.display = 'none'
    btns.forEach(btn => {
        btn.disabled = false
    })
    score = 0
    updateScoreCard(score, highScore)
})

continueBtn.addEventListener('click', function() {
    quitBox.style.display = 'none'
    btns.forEach(btn => {
        btn.disabled = false
    })
    backBtn.click()
})

replayBtn.addEventListener('click', function() {
    winBox.style.display = 'none'
    btns.forEach(btn => {
        btn.disabled = false
    })
    score = 0
    updateScoreCard(score, highScore)
})

tryAgainBtn.addEventListener('click', function() {
    score = 0
    updateScoreCard(score, highScore)
    lostBox.style.display = 'none'
    btns.forEach(btn => {
        btn.disabled = false
    })
    board = resetBoard(board)
    updateBoard(board)
})

function tryAgain() {
    lostBox.style.display = 'initial'
    lostBox.style.height = `${parseInt(Board.offsetWidth)}px`
    lostBox.style.width = `${parseInt(Board.offsetWidth)}px`
    btns.forEach(btn => {
        btn.disabled = true
    })
}

function Congratulation() {
    winBox.style.display = 'initial'
    winBox.style.height = `${parseInt(Board.offsetWidth)}px`
    winBox.style.width = `${parseInt(Board.offsetWidth)}px`
    btns.forEach(btn => {
        btn.disabled = true
    })
}

function updateScoreCard(score, highScore) {
    scoreCard.innerHTML = score
    highScoreCard.innerHTML = highScore
}

function initializeBoard(board) {
    for (let i=0; i<2; i++) {
        let emptyCells = getEmptyCells(board)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        row = emptyCell[0]
        col = emptyCell[1]
        board[row][col] = [2, 4][Math.floor(Math.random()*2)]
    }
    return board
}

function resetBoard(board) {
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            board[i][j] = 0
        }
    }
    board = initializeBoard(board)
    score = 0
    updateScoreCard(score, highScore)
    return board
}

function toContinue(board, prevState) {
    let changes = 0
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            if (board[i][j] != prevState[i][j]) {
                changes += 1
                return true
            }
        }
    }
    // console.log(changes)
    return (changes == 0) ? false : true
}

function getPrevState(prevState, board) {
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            prevState[i][j] = board[i][j]
        }
    }
    return prevState
}

function updateBoard(board) {
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            cell = cells[i].children[j]
            if (board[i][j] != 0) {
                cell.style.backgroundColor = `rgb(68, 58, ${colorPalette[board[i][j]]})`
                cell.style.transition = '500ms'
                cell.innerHTML = board[i][j]
            }
            else {
                cell.innerHTML = ''
                cell.style.backgroundColor='rgb(14, 5, 2)'
            }
        }
    }
}

function pushToLeft(row, val, index, joins) {
    for (let i=0; i<=index; i++) {
        if (val == row[i] && row[i+1] == 0) {    
            if ((joins != 1 && row[0] == val) || (row[0] != val)) {
                row[i] += val
                joins++
                return {
                    changes: joins
                }
            } 
        }
        if (row[i] == 0) {
            row[i] = val
            return {
                changes: joins
            }
        }
    }
}

function shiftingValuesToLeft(row) {
    let joins = 0
    for (let i=0; i<row.length; i++) {
        if (row[i] != 0) {
            let val = row[i]
            if (i != 0) {
                row[i] = 0
                joins = pushToLeft(row, val, i, joins).changes
            }
        }
    }
    let score = joins*10
    return score
}

function transpose(board) {
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<i; j++) {
            let temp = board[i][j]
            board[i][j] = board[j][i]
            board[j][i] = temp
        }
    }
    return board
}

function pushToRight(row, val, index, joins) {
    for (let i=row.length-1; i>=index; i--) {
        if (val == row[i] && row[i-1] == 0) {
            if ((joins != 1 && row[row.length-1] == val) || (row[row.length-1] != val)) {
                row[i] += val
                joins++
                return {
                    changes: joins
                }
            }
        }
        if (row[i] == 0) {
            row[i] = val
            return {
                changes: joins
            }
        }
    }
}

function shiftingValuesToRight(row) {
    let joins = 0
    for (let i=row.length-1; i>=0; i--) {
        if (row[i] != 0) {
            val = row[i]
            if (i != row.length-1) {
                row[i] = 0
                joins = pushToRight(row, val, i, joins).changes
            }
        }
    }
    let score = joins*10
    return score
}

function getEmptyCells(board) {
    let emptyCells = []
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            if (board[i][j] == 0) {
                emptyCells.push([i, j])
            }
        }
    }
    return emptyCells
}

function generateAnotherNumInRandomEmptyCell(board) {
    let randomNumberFromAnArray = [2, 4][Math.floor(Math.random()*2)]
    let emptyCells = getEmptyCells(board)
    let randomEmptyCell = emptyCells[Math.floor(Math.random()*emptyCells.length)]
    // console.log(randomEmptyCell)
    let row = randomEmptyCell[0]
    let col = randomEmptyCell[1]
    board[row][col] = randomNumberFromAnArray
    return board
}

function checkWin(board) {
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[i].length; j++) {
            if (board[i][j] == 2048) {
                return true
            } else {
                continue
            }
        }
    }
    return false
}

// function checkLoss(board, score, prevScore) {
//     console.log(board)
//     return (checkIsFullGrid(board) == true && score == prevScore) ? true : false
// }

// function checkIsFullGrid(board) {
//     for (let i=0; i<4; i++) {
//         console.log(i)
//         for (let j=0; j<4; i++) {
//             if (board[i][j] == 0) return false
//             else continue
//         }
//     }
//     return true
// }

board = initializeBoard(board)
updateBoard(board)