var Game = function () {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;

    $('#grid-size').focusout(function () {
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;
        alert(height);
    });
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