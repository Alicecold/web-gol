var Game = function () {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;

    $('#grid-size').on(function () {
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;
        alert(height);
    });
};




$(document).ready(function () {
    var game = new Game();
});