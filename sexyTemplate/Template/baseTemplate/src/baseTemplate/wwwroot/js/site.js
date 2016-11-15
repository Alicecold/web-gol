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

    //if (height > 0 & width > 0) {

    //}
    //$("table").on(function () {

    //    $("td").click(function (data) {
    //        selectedCells.push(parseInt(this.id));
    //        $(this).addClass("valid");
    //    });

    //});
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
            $(this).css("background-color", "#FFFFFF");
        });
    };

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