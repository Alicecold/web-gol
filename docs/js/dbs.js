
function saveCells(name, cells, width, height) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(name, JSON.stringify({cells: cells, width: width, height: height }));
    } else {
        // Sorry! No Web Storage support..
    }
}
