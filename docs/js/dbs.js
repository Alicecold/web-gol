
function saveCells(name, cells, width, height) {
    var date = getDate();
    localStorage.setItem(name, JSON.stringify({name: name,date: date, cells: cells, width: width, height: height }));
}

function getDate(){
    return new Date().toISOString().substring(0, 10);
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
