var Game = function () {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var column = "", appendRow = "", inc = 1, selectedCells = [], toRemoveClass = [], toAddClass = [], maxValue;

    $('#grid-size').focusout(function () {
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;
    });

    var createGrid = function (height, width) {

        for (var rows = 1; rows <= height; rows++) {
            for (var col = 1; col <= width; col++) {
                column += "<td  id =" + inc + col + ">  </td>";
            }
            appendRow += "<tr>" + column + "</tr>";
            column = "";
            inc++;
        }
        $(".table").append(appendRow);
    };
    
    $("#playBtn").click(function () {
        createGrid(height, width);
    })


};


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