﻿var Game = function () {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var column = "", appendRow = "", inc = 1;
    var cells = [];

    $('#grid-size').focusout(function () {
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;

        $('#gridBoard').empty();
        createGrid(height, width);
    });

    var createGrid = function (height, width) {
        //Create array
        cells.length = height * width;
        //add elements to append row
        for (var rows = 0; rows < height; rows++) {
            for (var col = 0; col < width; col++) {
                column += '<img class="dead cell" src="/images/cell.svg" data-id = ' + col + ' onclick="">';
            }
            appendRow += "<div data-id='" + rows + "' >" + column + "</div>";
            column = "";
            inc++;
        }
        //add elements to html-doc, within #gridboard
        $("#gridBoard").append(appendRow);

        //add corresponing elements to cell-array
        for (var rows = 0; rows < height; rows++) {
            for (var col = 0; col < width; col++) {
                cells[+rows + (+col * height)] = false;
                // +rows => rows as a interger. vice versa with +col
                // the calculation within the brackets are a simple 2d to 1d array conversion
            }
        }
        appendRow = ""; //empty appendRow


        //Make clickable
        $(".cell").click(function () {
            var row = $(this).closest("div").attr("data-id");
            var col = $(this).attr("data-id");
            cells[+row + (+col * height)] = changeState(this);
        });
    };
    createGrid(width, height); //create standard grid
    randomize(cells, height); //this randomizes cells when button "randomize" is clicked

    var time = 1000;
    playGame(cells, width, height, time); //this does not work as expected, but something temporary happens!
    //pauseGame(); //this does nothing
};

changeState = function (thisClass) {
    $(thisClass).toggleClass('dead alive'); // toogle class that was sent in
    return $(thisClass).hasClass('alive'); //set isAlive of current index to true if class of element is alive.
}
//var pauseGame = function () {
//    $("#pauseBtn").click(function () {
//        alert("paus");
//    });
//}
var playGame = function (cells, width, height, time) {

    
    $("#playBtn").click(function () {
        setInterval(function () {
            
            var toChange = jQuery.extend(true, [], cells);

            //check for changes
            for (row = 0; row < height; row++) {
                for (col = 0; col < width; col++) {
                    var numberOfNeighbours = 0;

                    //Up
                    var checkRow = +row - 1;
                    var checkCol = +col;
                    if (checkRow < 0)
                        checkRow = height - 1;
                    if (cells[+checkRow + (+checkCol * +height)])
                        numberOfNeighbours++;

                    //Upper left
                    checkCol = +col - 1;
                    if (checkCol < 0)
                        checkCol = width - 1;
                    if (cells[+checkRow + (+checkCol * +height)])
                        numberOfNeighbours++;

                    //Upper right
                    checkCol = +col + 1;
                    if (checkCol > width - 1)
                        checkCol = 0;
                    if (cells[+checkRow + (+checkCol * +height)])
                        numberOfNeighbours++;

                    //Left
                    checkRow = +row;
                    checkCol = +col - 1;
                    if (checkCol < 0)
                        checkCol = width - 1;
                    if (cells[+checkRow + (+checkCol * +height)])
                        numberOfNeighbours++;

                    //Right
                    checkCol = +col + 1;
                    if (checkCol > width - 1)
                        checkCol = 0;
                    if (cells[+checkRow + (+checkCol * +height)])
                        numberOfNeighbours++;

                    //Down
                    checkRow = +row + 1;
                    if (checkRow > height - 1)
                        checkRow = 0;
                    if (cells[+checkRow + (+checkCol * +height)])
                        numberOfNeighbours++;

                    //Down left
                    checkCol = +col - 1;
                    if (checkCol < 0)
                        checkCol = width - 1;
                    if (cells[+checkRow + (+checkCol * +height)])
                        numberOfNeighbours++;

                    //Down right
                    checkCol = +col + 1;
                    if (checkCol > width - 1)
                        checkCol = 0;
                    if (cells[+checkRow + (+checkCol * +height)])
                        numberOfNeighbours++;


                    if (cells[+row + (+col * +height)] && numberOfNeighbours != 3 && numberOfNeighbours != 2) {
                        toChange[+row + (+col * +height)] = false;
                    }

                    if (!cells[+row + (+col * +height)] && numberOfNeighbours == 3) {
                        toChange[+row + (+col * +height)] = true;
                    }

                }
            }

            //apply changes
            $(".cell").each(function () {
                var row = $(this).closest("div").attr("data-id");
                var col = $(this).attr("data-id");
                
                if (toChange[+row + (+col * +height)] != cells[+row + (+col * +height)]) {
                    cells[+row + (+col * height)] = changeState(this);
                }
            });
        }, 1000);
    });
}

var randomize = function(cells, height){
    $("#randomizeBtn").click(function () {
        $(".cell").each(function () {
            if (Math.random() > 0.75) {
                var row = $(this).closest("div").attr("data-id");
                var col = $(this).attr("data-id");
                cells[+row + (+col * height)] = changeState(this);
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
        if ($(window).width() >= 500)// if more than
            $('.myCol').show();
        if ($(window).width() < 500)// if less than
            $('.myCol').hide();
    });
}




$(document).ready(function () {
    var game = new Game();
    var menu = toggleSettings();
});