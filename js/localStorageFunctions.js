function isLocalStorageAvailable() {
    return window.localStorage;
}

function saveElementToLocalStorage(name, element) {
    if (isLocalStorageAvailable()) {
        localStorage.setItem(name, JSON.stringify(element));
    }
}

function getElementFromLocalStorageIfPossible(name) {
    if (isLocalStorageAvailable()) {
        return getElementElementFromLocalStorage(name);
    }
}

function getElementElementFromLocalStorage(name) {
    var item = localStorage.getItem(name);
    if (item && item != "undefined") {
        return JSON.parse(item);
    } else {
        return undefined;
    }
}

function removeElementFromLocalStorage(name) {
    if (isLocalStorageAvailable()) {
        localStorage.removeItem(name);
    }
}