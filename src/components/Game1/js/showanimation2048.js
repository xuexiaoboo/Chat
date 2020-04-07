// 游戏的动画函数
import $ from 'jquery'
import support from './support2048'

// 生成数字
function showNumAnimation(i, j, randNum) {
    var numCell = $('#num-cell-' + i + '-' + j);

    numCell.css("background-color", support.getNumBgc(randNum));
    numCell.css("color", support.getNumColor(randNum));
    numCell.text(randNum);

    numCell.animate({ //jquery
        width: "100px",
        height: "100px",
        top: support.getTop(i, j),
        left: support.getLeft(i, j)
    }, 70)
}


// 移动动画
function showMoveAnimation(fromX, fromY, toX, toY) {
    var numCell = $('#num-cell-' + fromX + '-' + fromY);
    numCell.animate({
        top: support.getTop(toX, toY),
        left: support.getLeft(toX, toY)
    }, 200);
}

function updateScore(score) {
    $("#score").text(score);
}

export default {
    showNumAnimation,
    showMoveAnimation,
    updateScore
}