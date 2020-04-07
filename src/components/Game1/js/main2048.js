// 游戏的运行逻辑
import support from './support2048'
import animation from './showanimation2048'
import $ from 'jquery'


var board = new Array();
var score = 0;
var flag = new Array();

// $(document).ready(function() {
//     newgame();
// });

// 开始新游戏
function newGame() {
    // 初始化棋盘
    init();

    // 生成数字
    creatNum();
    creatNum();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', support.getTop(i, j));
            gridCell.css('left', support.getLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        flag[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            flag[i][j] = false;
        }
    }

    score = 0;
    animation.updateScore(score)
    updateBoardView();
}


function updateBoardView() {
    $(".num-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class = "num-cell" id = "num-cell-' + i + '-' + j + '"></div>');
            var numCell = $('#num-cell-' + i + '-' + j + '');

            if (board[i][j] === 0) {
                numCell.css('height', '0');
                numCell.css('width', '0');
                numCell.css('top', support.getTop(i, j) + 50);
                numCell.css('left', support.getLeft(i, j) + 50);
            } else {
                numCell.css('height', '100px');
                numCell.css('width', '100px');
                numCell.css('top', support.getTop(i, j));
                numCell.css('left', support.getLeft(i, j));
                // 移动之后添加样式
                numCell.css('background-color', support.getNumBgc(board[i][j]))
                numCell.css('color', support.getNumColor(board[i][j]))
                numCell.text(board[i][j])
            }
            flag[i][j] = false;
        }
    }
}

function creatNum() {
    if (support.noSpace(board)) {
        return false;
    }
    // 随机一个位置
    var randX = parseInt(Math.floor(Math.random() * 4)); //0, 1, 2, 3
    var randY = parseInt(Math.floor(Math.random() * 4));
    var times = 0; //随机数生成次数
    while (times < 50) {
        if (board[randX][randY] == 0) {
            break;
        }

        var randX = parseInt(Math.floor(Math.random() * 4)); //0, 1, 2, 3
        var randY = parseInt(Math.floor(Math.random() * 4));

        times++;
    }

    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randX = i;
                    randY = j;
                }
            }
        }
    }

    // 随机一个数字
    var randNum = Math.random() < 0.5 ? 2 : 4;

    // 随机位置显示随机数字
    board[randX][randY] = randNum;
    animation.showNumAnimation(randX, randY, randNum);

    // return true;
}

// 玩家操作
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37: //Left
            if (moveLeft()) {
                setTimeout(() => { creatNum() }, 210);
                setTimeout(() => { isGameOver() }, 300);
            }
            break;
        case 38: //Up
            if (moveUp()) {
                setTimeout(() => { creatNum() }, 210);
                setTimeout(() => { isGameOver() }, 300);
            }
            break;
        case 39: //Right
            if (moveRight()) {
                setTimeout(() => { creatNum() }, 210);
                setTimeout(() => { isGameOver() }, 300);
            }
            break;
        case 40: //Down
            if (moveDown()) {
                setTimeout(() => { creatNum() }, 210);
                setTimeout(() => { isGameOver() }, 300);
            }
            break;
        default:
            break;
    }
});


function isGameOver() {
    if (support.noSpace(board) && support.noMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert("你是个废的！");
}

// 左移
function moveLeft() {
    if (!support.canMoveLeft(board)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && support.noBlockL(i, k, j, board)) {
                        // move
                        animation.showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && support.noBlockL(i, k, j, board) && !flag[i][k]) {
                        // move
                        animation.showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        animation.updateScore(score);
                        flag[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(() => { updateBoardView() }, 200)
    return true;
}

// 上移
function moveUp() {
    if (!support.canMoveUp(board)) {
        return false
    }

    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && support.noBlockU(k, i, j, board)) {
                        // move
                        animation.showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && support.noBlockU(k, i, j, board) && !flag[k][j]) {
                        animation.showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j]
                        board[i][j] = 0;

                        score += board[k][j];
                        animation.updateScore(score);
                        flag[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(() => { updateBoardView() }, 200);
    return true;
}

// 右移
function moveRight() {
    if (!support.canMoveRight(board)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] === 0 && support.noBlockR(i, k, j, board)) {
                        animation.showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] === board[i][j] && support.noBlockR(i, k, j, board) && !flag[i][k]) {
                        animation.showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        animation.updateScore(score);
                        flag[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(() => { updateBoardView() }, 200);
    return true;
}

// 下移
function moveDown() {
    if (!support.canMoveDown(board)) {
        return false;
    }

    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] === 0 && support.noBlockD(k, i, j, board)) {
                        animation.showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] === board[i][j] && support.noBlockD(k, i, j, board) && !flag[k][j]) {
                        animation.showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        animation.updateScore(score);
                        flag[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(() => { updateBoardView() }, 200);
    return true;
}

export default {
    newGame,
    moveDown,
    moveRight,
    moveUp,
    moveLeft,
    gameOver,
    updateBoardView,
    creatNum,
    init,
    isGameOver,
}