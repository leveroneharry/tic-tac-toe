
const BOARD_WIDTH = 3;
const PLAYER_ONE_MARK = "X";
const PLAYER_TWO_MARK = "O";
const EMPTY_MARK = "";
const START_MESSAGE = "Mark a box to start!";
const PLAYER_ONE_TURN = `Your turn, Player ${PLAYER_ONE_MARK}.`;
const PLAYER_TWO_TURN = `Your turn, Player ${PLAYER_TWO_MARK}.`;
const PLAYER_ONE_WINS = `Player ${PLAYER_ONE_MARK} wins!`;
const PLAYER_TWO_WINS = `Player ${PLAYER_TWO_MARK} wins!`;
const DRAW_MESSAGE = "It's a draw!";

let turn = 1;
let gameOver = false;

const board = setupBoard(document.querySelectorAll("#board div"));
const message = document.querySelector("#message");
const resetButton = document.querySelector("#reset_button");

resetButton.addEventListener("click", resetGame);

function setupBoard(boxArray) {
    let temp = [];
    for (let i = 0; i < BOARD_WIDTH; i++) {
        temp[i] = [];
        for (let j = 0; j < BOARD_WIDTH; j++) {
            const box = boxArray[(i * BOARD_WIDTH) + j];
            box.textContent = EMPTY_MARK;
            box.addEventListener("click", () => takeTurn(box));
            temp[i][j] = box;
        }
    }
    return temp;
}

function resetGame() {
    clearBoard();
    message.textContent = START_MESSAGE;
    turn = 1;
    gameOver = false;
}

function clearBoard() {
    for (let i = 0; i < BOARD_WIDTH; i++) {
        for (let j = 0; j < BOARD_WIDTH; j++) {
            board[i][j].textContent = EMPTY_MARK;
        }
    }
}

function takeTurn(box) {
    if (!gameOver && isEmpty(box)) {
        markBox(box);
        gameOver = isBoardSolved() || isDraw();
        updateMessage();
        turn++;
    }
}

function markBox(box) {
    box.textContent = isPlayerOne() ? PLAYER_ONE_MARK : PLAYER_TWO_MARK;
}

function isEmpty(box) {
    return box.textContent === EMPTY_MARK;
}

function isPlayerOne() {
    return turn % 2 == 1;
}

function isBoardSolved() {
    return isCompleteRow() || isCompleteColumn() || isCompleteDiagonal();
}

function isCompleteRow() {
    for (let i = 0; i < BOARD_WIDTH; i++) {
        if (!isEmpty(board[i][0])) {
            for (let j = 0; j < BOARD_WIDTH && isEqual(board[i][0], board[i][j]); j++) {
                if (j === BOARD_WIDTH - 1) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isCompleteColumn() {
    for (let j = 0; j < BOARD_WIDTH; j++) {
        if (!isEmpty(board[0][j])) {
            for (let i = 0; i < BOARD_WIDTH && isEqual(board[0][j], board[i][j]); i++) {
                if (i === BOARD_WIDTH - 1) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isCompleteDiagonal() {
    return isCompleteForwardDiagonal() || isCompleteBackwardDiagonal();
}

function isCompleteForwardDiagonal() {
    if (!isEmpty(board[0][0])) {
        for (let i = 0; i < BOARD_WIDTH && isEqual(board[0][0], board[i][i]); i++) {
            if (i === BOARD_WIDTH - 1) {
                return true;
            }
        }
    }
    return false;
}

function isCompleteBackwardDiagonal() {
    if (!isEmpty(board[0][BOARD_WIDTH - 1])) {
        for (let i = 0; i < BOARD_WIDTH && isEqual(board[0][BOARD_WIDTH - 1], board[i][BOARD_WIDTH - 1 - i]); i++) {
            if (i === BOARD_WIDTH - 1) {
                return true;
            }
        }
    }
    return false;
}

function isEqual(box1, box2) {
    return box1.textContent === box2.textContent;
}

function isDraw() {
    return turn === BOARD_WIDTH ** 2;
}

function updateMessage() {
    if (isBoardSolved()) {
        message.textContent = isPlayerOne() ? PLAYER_ONE_WINS : PLAYER_TWO_WINS;
    } else if (isDraw()) {
        message.textContent = DRAW_MESSAGE;
    } else {
        message.textContent = isPlayerOne() ? PLAYER_TWO_TURN : PLAYER_ONE_TURN;
    }
}
