function saveElementToLocalStorage(name, element) {
    if (window.localStorage) {
        localStorage.setItem(name, JSON.stringify(element));
    }
}

function getElementFromLocalStorage(name){
    if (window.localStorage){
        var item = localStorage.getItem(name);
        if (item && item != "undefined") {
            return JSON.parse(item);
        } else {
            return undefined;
        }
    }
}

function removeElementFromLocalStorage(name) {
    if (window.localStorage) {
        localStorage.removeItem(name);
    }
}