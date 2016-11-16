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
                column += '<img class="dead cell" src="/images/cell.svg"  id =' + inc + col + '>';
            }
            appendRow += "<div>" + column + "</div>";
            column = "";
            inc++;
        }
        $("#gridBoard").append(appendRow);
        appendRow = "";

        $(".dead").click(function () {
            $(this).css("filter", "hue-rotate(90deg) brightness(1.25)");
            $(this).attr('class', 'alive cell');

        });

        $(".alive").click(function () {
            $(this).css("filter", "brightness(0.25)");
            $(this).attr('class', 'dead cell');

        });
    };
    createGrid(5, 5);

    
};




var toggleSettings = function () {

    $('#settings').click(function () {
        $('.myCol').show();
    });

    $('#close').click(function () {
        $('.myCol').hide();
    });

    $(window).resize(function () {
        if ($(this).innerWidth > "500px") {
            $('.myCol').show();
        }
        if ($(this).innerWidth < "500px") {
            $('.myCol').hide();
        }
    });
}




$(document).ready(function () {
    var game = new Game();
    var menu = toggleSettings();

});