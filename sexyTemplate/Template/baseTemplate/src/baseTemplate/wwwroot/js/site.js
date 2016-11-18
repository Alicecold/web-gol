var Game = function () {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var column = "", appendRow = "", inc = 1; // selectedCells = [], toRemoveClass = [], toAddClass = [], maxValue;
    var cells = [];

    $('#grid-size').focusout(function () {
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;

        $('#gridBoard').empty();
        createGrid(height, width);
    });

    var createGrid = function (height, width) {
        cells.length = height * width;
        for (var rows = 1; rows <= height; rows++) {
            for (var col = 1; col <= width; col++) {
                column += '<img class="dead cell" src="/images/cell.svg" data-id = ' + col + ' onclick="">';
                cells[rows + (col * height)] = new cell(rows, col, false);
            }
            appendRow += "<div data-id='" + inc + "' >" + column + "</div>";
            column = "";
            inc++;
        }
        $("#gridBoard").append(appendRow);
        appendRow = "";

        $(".cell").click(function () {
            $(this).toggleClass('dead alive');
            //cells[$(this).closest("div").attr("data-id") + ($(this).attr("data-id") * width)].changeState(this);
        });
    };
    createGrid(width, height);
    randomize();
    playGame(cells, width, height);
    pauseGame();
};

function cell(divID, colID, isAlive) {
    this.row = divID;
    this.colID = colID;
    this.isAlive = isAlive;
    this.changeState = function (thisClass) {
        this.isAlive = !this.isAlive;
    }
}
var pauseGame = function () {
    $("#pauseBtn").click(function () {
        alert("paus");
    });
}
var playGame = function (cells, cols, rows) {

    $("#playBtn").click(function () {
        alert("play");
        for (r = 1; r <= rows; r++) {
            for (c = 1; c <= cols; c++) {
                if (cells[r + (c * rows)].isAlive()) {
                    cells[r + (c * rows)].changeState(this);

                } else {
                    cells[r + (c * rows)].changeState(this);
                }
            }
        }
    });
    //check for changes
    //change
}

var randomize = function(){
    $("#randomizeBtn").click(function () {
        $(".cell").each(function () {
            if(Math.random() > 0.75)
                $(this).toggleClass("dead alive");
        });
    });
}
var toggleSettings = function () {
    $('#settings').click(function () {
        $('.myCol').show();
    });

    $('#close').click(function () {
        $('.myCol').hide();
    });
}



$(document).ready(function () {
    var game = new Game();
    var menu = toggleSettings();
    
});