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
        for (var rows = 0; rows < height; rows++) {
            for (var col = 0; col < width; col++) {
                column += '<img class="dead cell" src="/images/cell.svg" data-id = ' + col + ' onclick="">';
            }
            appendRow += "<div data-id='" + rows + "' >" + column + "</div>";
            column = "";
            inc++;
        }
        $("#gridBoard").append(appendRow);
        for (var rows = 0; rows < height; rows++) {
            for (var col = 0; col < width; col++) {
                cells[+rows + (+col * height)] = new cell(+rows, +col, $("data-id" + rows + " > data-id" + col), false);
            }
        }
        appendRow = "";

        $(".cell").click(function () {
            var row = $(this).closest("div").attr("data-id");
            var col = $(this).attr("data-id");
            var index = +row + +col;
            cells[ +row + (+col  * height)].changeState(this);
        });
    };
    createGrid(width, height);
    randomize(height);
    playGame(cells, width, height);
    pauseGame();
};

function cell(divID, colID, cellID, isAlive) {
    this.row = divID;
    this.colID = colID;
    this.cellID = cellID;
    this.isAlive = isAlive;
    this.changeState = function (thisClass) {
        $(thisClass).toggleClass('dead alive');
        this.isAlive = $(thisClass).hasClass('alive');
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
                if (cells[+r + (+c * +rows)].isAlive()) {
                    cells[+r + (+c * +rows)].changeState();

                } else {
                    cells[+r + (+c * +rows)].changeState();
                }
            }
        }
    });
    //check for changes
    //change
}

var randomize = function(height){
    $("#randomizeBtn").click(function () {
        $(".cell").each(function () {
            if (Math.random() > 0.75) {
                var row = $(this).closest("div").attr("data-id");
                var col = $(this).attr("data-id");
                cells[+row + (+col * +height)].changeState(this);
                //$(this).toggleClass("dead alive");
            }
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

    $(window).resize(function () {
        // This will execute whenever the window is resized
        if ($(window).width() >= 400)// New width
            $('.myCol').show();
        if ($(window).width() < 400)// New width
            $('.myCol').hide();
    });
}




$(document).ready(function () {
    var game = new Game();
    var menu = toggleSettings();
});