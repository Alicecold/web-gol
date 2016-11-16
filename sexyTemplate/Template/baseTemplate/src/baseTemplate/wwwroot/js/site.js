var Game = function () {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var column = "", appendRow = "", inc = 1, selectedCells = [], toRemoveClass = [], toAddClass = [], maxValue;

    $('#grid-size').focusout(function () {
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;

        $('#gridBoard').empty();
        createGrid(height, width);
    });

    var createGrid = function (height, width) {
        for (var rows = 1; rows <= height; rows++) {
            for (var col = 1; col <= width; col++) {
                column += '<img class="dead cell" src="/images/cell.svg"  id = ' + inc + col + ' onclick="">';
            }
            appendRow += "<div id='row" + inc + "' >" + column + "</div>";
            column = "";
            inc++;
        }
        $("#gridBoard").append(appendRow);
        appendRow = "";

        $(".cell").click(function () {
            $(this).toggleClass('dead alive');
        });

    };
    createGrid(20, 20);
    randomize();
};

var playGame = function () {
    //check for changes
    //change
}

var randomize = function(){
    $("#randomizeBtn").click(function () {
        $(".cell").each(function (index) {
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