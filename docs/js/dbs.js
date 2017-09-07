
function saveCells(name, cells, width, height) {
    if(localStorage.getItem("listOfBoards")){
        localStorage.setItem("listOfBoards", []);
    }
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(name, JSON.stringify({cells: cells, width: width, height: height }));
        var boardarr = localStorage.getItem("listOfBoards");
        boardarr.push(name);
        localStorage.setItem("listOfBoards", boardarr);
    } else {
        // Sorry! No Web Storage support..
    }
}

function getNumberOfBoards(){
    return localStorage.length();
}

function getBoardByIndex(index){
    return localStorage[index];
}
