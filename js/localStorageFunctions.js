function saveToLocalStorage(name, element) {
    if (window.localStorage) {
        localStorage.setItem(name, JSON.stringify(element));
    }
}

function getFromLocalStorage(name){
    if (window.localStorage){
        var item = localStorage.getItem(name);
        if (item && item != "undefined") {
            return JSON.parse(item);
        }
    }
}