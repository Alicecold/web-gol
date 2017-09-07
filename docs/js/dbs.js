
function saveCells(name, cells, width, height) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(name, JSON.stringify({name: name, cells: cells, width: width, height: height }));
    } else {
        // Sorry! No Web Storage support..
    }
}

function getNumberOfBoards(){
    return localStorage.length;
}

function getBoardByIndex(index){
    return JSON.parse($.map(localStorage, function(value, i){
        return [value];
    })[index]);
}

function getBoardByName(name){
    return JSON.parse(localStorage.getItem(name));
}
