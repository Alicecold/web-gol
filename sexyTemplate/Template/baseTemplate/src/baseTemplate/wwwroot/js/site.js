var Game = function () {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var column = "", appendRow = "", inc = 1, selectedCells = [], toRemoveClass = [], toAddClass = [], maxValue;

    $('#grid-size').focusout(function () {
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;

        $('#grid > tbody').remove();
        $('#grid').append('<tbody> </tbody>');
        createGrid(height, width);
    });

    var createGrid = function (height, width) {
        for (var rows = 1; rows <= height; rows++) {
            for (var col = 1; col <= width; col++) {
                column += '<td  onclick="" id =' + inc + col + '>  </td>';
            }
            appendRow += "<tr>" + column + "</tr>";
            column = "";
            inc++;
        }
        $("#grid > tbody").append(appendRow);
        appendRow = "";

        $("#grid>tbody>tr> td").click(function () {
            $(this).html('<img id="cells" src="/images/cell.svg">');



        });
    };
    createGrid(20,20);
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
    var change = changeState();
    var menu = toggleSettings();
});