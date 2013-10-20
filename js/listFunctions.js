var LIST_NAMES_KEY = 'all.list.names',
    CURRENT_LIST_NAME_KEY = 'list.current_list_name',
    CURRENT_TODOS_NAME_KEY = 'current_todos_name',
    COMPLETED_TODOS_NAME_KEY = 'completed_todos_name';


/* Current to do list name */

function getCurrentListFromLocalStorage() {
    return getElementFromLocalStorageIfPossible(CURRENT_LIST_NAME_KEY) || 'Default';
}

function saveCurrentListNameToLocalStorage(listName) {
    saveElementToLocalStorage(CURRENT_LIST_NAME_KEY, listName)
}

/* List of to do list names*/

function getAllListNamesFromLocalStorage() {
    return getElementFromLocalStorageIfPossible(LIST_NAMES_KEY) || ['Default'];
}

function saveAllListNamesToLocalStorage(listOfListNames) {
    saveElementToLocalStorage(LIST_NAMES_KEY, listOfListNames);
}


/* Current todos of to do list*/

function getCurrentTodosOfListFromLocalStorage(listName) {
    return getElementFromLocalStorageIfPossible(listName + '.' + CURRENT_TODOS_NAME_KEY) || [];
}

function saveCurrentTodosToLocalStorage(listName, currentTodos) {
    saveElementToLocalStorage(listName + '.' + CURRENT_TODOS_NAME_KEY, currentTodos);
}

function removeCurrentTodosFromLocalStorage(listName) {
    removeElementFromLocalStorage(listName + '.' + CURRENT_TODOS_NAME_KEY);
}


/* Completed todos of to do list*/

function getCompletedTodosOfListFromLocalStorage(listName) {
    return getElementFromLocalStorageIfPossible(listName + '.' + COMPLETED_TODOS_NAME_KEY) || [];
}

function saveCompletedTodosToLocalStorage(listName, completedTodos) {
    saveElementToLocalStorage(listName + '.' + COMPLETED_TODOS_NAME_KEY, completedTodos);
}

function removeCompletedTodosFromLocalStorage(listName) {
    removeElementFromLocalStorage(listName + '.' + COMPLETED_TODOS_NAME_KEY);
}


function replaceLocalStorageTodos(oldListName, newListName) {
    var currentTodos = getCurrentTodosOfListFromLocalStorage(oldListName);
    var completedTodos = getCompletedTodosOfListFromLocalStorage(oldListName);

    removeListTodosInLocalStorage(oldListName);
    updateListTodosInLocalStorage(newListName, currentTodos, completedTodos);
}

function removeListTodosInLocalStorage(oldListName) {
    removeCurrentTodosFromLocalStorage(oldListName);
    removeCompletedTodosFromLocalStorage(oldListName);
}

function updateListTodosInLocalStorage(newListName, currentTodos, completedTodos) {
    saveCurrentTodosToLocalStorage(newListName, currentTodos);
    saveCompletedTodosToLocalStorage(newListName, completedTodos);
}

function createNewCurrentToLocalStorage(listName) {
    var currentLists = getAllListNamesFromLocalStorage();
    if (currentLists.indexOf(listName) === -1) {
        currentLists.push(listName);
        saveCurrentListNameToLocalStorage(listName);
        saveAllListNamesToLocalStorage(currentLists)
    }
}

function changeListNameInLocalStorage(oldName, newName) {
    createNewCurrentToLocalStorage(newName);
    replaceLocalStorageTodos(oldName, newName);
}

