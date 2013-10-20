function isLocalStorageAvailable() {
    if (window.localStorage != undefined) {
        return true
    } else {
        return false;
    }
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
    if (item == undefined) {
        return null;
    } else if (item == 'undefined') {
        return undefined;
    } else {
        return JSON.parse(item);
    }
}

function removeElementFromLocalStorage(name) {
    if (isLocalStorageAvailable()) {
        localStorage.removeItem(name);
    }
}