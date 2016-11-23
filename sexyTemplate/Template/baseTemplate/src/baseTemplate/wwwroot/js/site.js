
var Game = function () {
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


        //change by click
        $(".cell").click(function () {
            var row = $(this).closest("div").attr("data-id");
            var col = $(this).attr("data-id");
            cells[+col + +row * width] = changeState(this);
        });
    };
    createGrid(width, height); //create standard grid
    cells = randomize(cells, height); //this randomizes cells when button "randomize" is clicked


    //Save knapp
    var savepopup = document.getElementById('savePop');
    var savebtn = document.getElementById("saveBtn");
    var span = document.getElementsByClassName("close")[0];
    savebtn.onclick = function () {
        savepopup.style.display = "block";
    };
    span.onclick = function () {
        savepopup.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target === savepopup) {
            savepopup.style.display = "none";
        }
        if (event.target === loadpopup) {
            loadpopup.style.display = "none";
        }
    };
    //Load knapp
    var loadpopup = document.getElementById('loadPop');
    var loadbtn = document.getElementById("loadBtn");
    span = document.getElementsByClassName("close")[1];
    loadbtn.onclick = function () {
        loadpopup.style.display = "block";
    };
    span.onclick = function () {
        loadpopup.style.display = "none";
    };



    playGame(cells, width, height);

    //Saving files
    $('#saveSave').click(function () {
        $.ajax(
        {
            type: 'post',
            url: '/api/cells/save',
            data: JSON.stringify({ saveName: $('#saveBar').val(), cells, width, height }),
            contentType:'application/json; charset=utf-8',
            datatype: 'json',
            cache: false
        }).fail(function (jqXHR, textStatus, errorThrown) {
        }).done(function (cells, textStatus, jqXHR) {
            plugin.cells = cells;
            initBoard();
        });

    });
};

changeState = function (thisClass) {
    $(thisClass).toggleClass('dead alive'); // toogle class that was sent in
    return $(thisClass).hasClass('alive'); //set isAlive of current index to true if class of element is alive.
};

changeRenderState = function (thisClass, thisCell) {
    if ($(thisClass).hasClass('alive') !== thisCell) // if rendered cell is not alive, but logical cell is, or vice versa
        $(thisClass).toggleClass('dead alive'); // toogle class of rendered cell
    
};

var playGame = function (cells, width, height) {
    var isPlaying = true;
    var time = $('input[name="speed"]:checked').val();
    $('input[name="speed"]').click(function () {
        time = $('input[name="speed"]:checked').val();
        isPlaying = false;
    });
    
    $("#playBtn").click(function () {
        //var isPlaying = true;
        //var speed = $('input[name="speed"]:checked').val();
        //var time = speed;
        function loop() {

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

                    if (cells[+checkCol + +checkRow * +width])
                        numberOfNeighbours++;

                    console.log(numberOfNeighbours);
                    if (cells[+col + +row * +width] && numberOfNeighbours !== 3 && numberOfNeighbours !== 2) {
                        toChange[+col + +row * +width] = false;
                    }

                    if (!cells[+col + +row * +width] && numberOfNeighbours === 3) {
                        toChange[+col + +row * +width] = true;
                    }

                }
            }

            //apply changes
            cells = $.extend(true, [], toChange); //This should be a deep copy but acts ver much like a shallow one

            $(".cell").each(function () {
                var row = $(this).closest("div").attr("data-id");
                var col = $(this).attr("data-id");
                changeRenderState(this, cells[+col + +row * width]);
            });

            $("#pauseBtn").click(function () {
                isPlaying = false;
            });

            if (isPlaying)
                setTimeout(loop, time);

        }
        loop();

    });
};

var randomize = function (cells, height) {
    $("#randomizeBtn").click(function () {
        $(".cell").each(function () {
            if (Math.random() > 0.75) {
                var row = $(this).closest("div").attr("data-id");
                var col = $(this).attr("data-id");
                cells[+col + +row * width] = changeState(this);
            }
        });
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

//var Database = new function (cells) {
//    var initCells = function () {



//        $.ajax(
//        {
//            type: 'get',
//            url: '/api/cells/load',
//            data: { saveName: 'first' },
//            datatype: 'json',
//            cache: false
//        }).fail(function (jqXHR, textStatus, errorThrown) {
//        }).done(function (cells, textStatus, jqXHR) {
//            plugin.cells = cells;
//            initBoard();
//        });


//        $.ajax(
//        {
//            type: 'get',
//            url: '/api/cells/getboards',
//            datatype: 'json',
//            cache: false
//        }).fail(function (jqXHR, textStatus, errorThrown) {
//        }).done(function (boards, textStatus, jqXHR) {
 
//            alert(boards);
//        });

//    };
//};
$(document).ready(function () {
    var game = new Game();
    var menu = toggleSettings();
    //var database = new Database();
});