﻿
var Game = function () {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var column = "", appendRow = "", inc = 1;
    var cells = [];
    

    $('#grid-size').focusout(function () {
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;

        createGrid(height, width);
    });

    var createGrid = function (height, width) {
        //Empty board
        $('#gridBoard').empty();
        //Create array
        cells.length = height * width;
        //add elements to append row
        for (rows = 0; rows < height; rows++) {
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
        for (rows = 0; rows < height; rows++) {
            for (col = 0; col < width; col++) {
                cells[+col + +rows * width] = false;
                // +rows => rows as a interger. vice versa with +col
                // the calculation within the brackets are a simple 2d to 1d array conversion
            }
        }
        appendRow = "";

    };
    createGrid(width, height); //create standard grid
    //change by click
    $(".cell").click(function () {
        var row = $(this).closest("div").attr("data-id");
        var col = $(this).attr("data-id");
        cells[+col + +row * width] = changeState(this);
    });
    $("#randomizeBtn").click(function () {
        cells = randomize(cells, width); //this randomizes cells when button "randomize" is clicked
    });

    //Save popup
    $('#saveBtn').click(function () {
        var save = $('#savePop');
        var span = $('.close');
        save.css("display", "block");
        span.click( function () {
            save.css("display", "none");
        });

        //Saving files
        $('#saveSave').click(function () {
            $.ajax(
            {
                type: 'post',
                url: '/api/cells/save',
                data: JSON.stringify({ saveName: $('#saveBar').val(), cells, width, height }),
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                cache: false
            }).fail(function (jqXHR, textStatus, errorThrown) {
            }).done(function (cells, textStatus, jqXHR) {
                plugin.cells = cells;
                initBoard();
            });
        });
    });
    //load popup
    $('#loadBtn').click(function () {
        $.ajax(
        {
            type: 'get',
            url: '/api/cells/getboards',
            datatype: 'json',
            cache: false
        }).fail(function (jqXHR, textStatus, errorThrown) {
        }).done(function (boards, textStatus, jqXHR) {
            var appendSaves = "";
            //Populera listan i popup
            //alert(boards[1].saveName + boards[1].saveDate);
            var load = $('#loadPop');
            var span = $('.close');
            load.css("display", "block");
            span.click(function () {
                load.css("display", "none");
            });
            $('#showData').empty();
            for (var i = 0; i < boards.length && i < 5; i++)
            {
                appendSaves = '<p class="loadFile" data-savename="' + boards[i].saveName + '" onclick="">' + boards[i].saveName + ' ' + boards[i].saveDate + '<br></p>';
                $('#showData').append(appendSaves);
            }
           
            
            $('.loadFile').click(function ()
            {
                var link = $(this);
                var saveName = link.attr('data-savename');
                alert(saveName);
                //Do your ajax stuff here...
                $.ajax({
                    type: 'get',
                    url: '/api/cells/Load',
                    data: {saveName:saveName},
                    datatype: 'json',
                    cache: false
                }).fail(function (jqXHR, textStatus, errorThrown) {
                }).done(function (cellData, textStatus, jqXHR) {
                    var width = cellData.length;
                    var height = cellData[0].length;
                    alert(width + " " + height);
                    var toCells = [];
                    toCells.length = width * height;

                    for (var y = 0; y < height; y++) {
                        for (var x = 0; x < width; x++) {
                            toCells[x + y * width] = cellData[x][y].isAlive;
                        }
                    }
                    createGrid(width, height);
                    cells = $.extend(true, [], toCells);
                    load.css("display", "none");
                });

            });
            
        });

    });

    //$('input[name="speed"]').click(function () {
    //    time = $('input[name="speed"]:checked').val();
    //    isPlaying = false;
    //});

    $("#playBtn").click(function () {
        playGame(cells, width, height, true);
    });

    
};

var changeState = function (thisClass) {
    $(thisClass).toggleClass('dead alive'); // toogle class that was sent in
    return $(thisClass).hasClass('alive'); //set isAlive of current index to true if class of element is alive.
};

var changeRenderState = function (thisClass, thisCell) {
    if ($(thisClass).hasClass('alive') !== thisCell) // if rendered cell is not alive, but logical cell is, or vice versa
        $(thisClass).toggleClass('dead alive'); // toogle class of rendered cell
    
};

var playGame = function (cells, width, height, isPlaying) {
    function loop() {
             $("#pauseBtn").click(function () {
                 isPlaying = false;
             });
            var time = $('input[name="speed"]:checked').val(); // Keep this here and it will work perfectly! <3
            var toChange = $.extend(true, [], cells);

            //check for changes
            for (row = 0; row < height; row++) {
                for (col = 0; col < width; col++) {
                    var numberOfNeighbours = 0;

                    //Up
                    var checkRow = +row - 1;
                    var checkCol = +col;
                    if (checkRow < 0)
                        checkRow = height - 1;
                    if (cells[+checkCol + +checkRow * +width])
                        numberOfNeighbours++;

                    //Upper left
                    checkCol = +col - 1;
                    if (checkCol < 0)
                        checkCol = width - 1;
                    if (cells[+checkCol + +checkRow * +width])
                        numberOfNeighbours++;

                    //Upper right
                    checkCol = +col + 1;
                    if (checkCol > width - 1)
                        checkCol = 0;
                    if (cells[+checkCol + +checkRow * +width])
                        numberOfNeighbours++;

                    //Left
                    checkRow = +row;
                    checkCol = +col - 1;
                    if (checkCol < 0)
                        checkCol = width - 1;

                    if (cells[+checkCol + +checkRow * +width])
                        numberOfNeighbours++;

                    //Right
                    checkCol = +col + 1;
                    if (checkCol > width - 1)
                        checkCol = 0;

                    if (cells[+checkCol + +checkRow * +width])
                        numberOfNeighbours++;

                    //Down
                    checkCol = +col;
                    checkRow = +row + 1;
                    if (checkRow > height - 1)
                        checkRow = 0;

                    if (cells[+checkCol + +checkRow * +width])
                        numberOfNeighbours++;

                    //Down left
                    checkCol = +col - 1;
                    if (checkCol < 0)
                        checkCol = width - 1;

                    if (cells[+checkCol + +checkRow * +width])
                        numberOfNeighbours++;

                    //Down right
                    checkCol = +col + 1;
                    if (checkCol > width - 1)
                        checkCol = 0;

                    console.log(+checkCol + +checkRow * +width);
                    if (cells[+checkCol + +checkRow * +width])
                        numberOfNeighbours++;

                    if (cells[+col + +row * +width] && numberOfNeighbours !== 3 && numberOfNeighbours !== 2) {
                        toChange[+col + +row * +width] = false;
                       
                    }

                    if (!cells[+col + +row * +width] && numberOfNeighbours === 3) {
                        toChange[+col + +row * +width] = true;
                    }

                }
            }

            //apply changes
            cells = $.extend(true, [], toChange);

            $(".cell").each(function () {
                var row = $(this).closest("div").attr("data-id");
                var col = $(this).attr("data-id");
                changeRenderState(this, cells[+col + +row * width]);
            });

            if (isPlaying)
                setTimeout(loop, time);

        }
        loop();
};

var randomize = function (cells, width) {
    $(".cell").each(function () {
        if (Math.random() > 0.75) {
            var row = $(this).closest("div").attr("data-id");
            var col = $(this).attr("data-id");
            cells[+col + +row * width] = changeState(this);
        }
    });
    return cells;
};
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
};


$(document).ready(function () {
    var game = new Game();
    var menu = toggleSettings();
});