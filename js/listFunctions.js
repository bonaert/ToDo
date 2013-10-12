var LIST_NAMES_KEY = 'all.list.names',
    CURRENT_LIST_NAME_KEY = 'list.current_list_name',
    CURRENT_TODOS_NAME_KEY = 'current_todos_name',
    COMPLETED_TODOS_NAME_KEY = 'completed_todos_name';

function getCurrentListFromLocalStorage() {
    return getElementFromLocalStorage(CURRENT_LIST_NAME_KEY) || 'Default';
}

function getAllListNamesFromLocalStorage() {
    return getElementFromLocalStorage(LIST_NAMES_KEY) || ['Default'];
}

function getCurrentTodosOfListFromLocalStorage(listName) {
    return getElementFromLocalStorage(listName + '.' + CURRENT_TODOS_NAME_KEY) || [];
}

function getCompletedTodosOfListFromLocalStorage(listName) {
    return getElementFromLocalStorage(listName + '.' + COMPLETED_TODOS_NAME_KEY) || [];
}


function replaceLocalStorageTodos(oldListName, newListName) {
    var old_current_todo_list_key = oldListName + '.' + CURRENT_TODOS_NAME_KEY;
    var old_completed_todo_list_key = oldListName + '.' + COMPLETED_TODOS_NAME_KEY;

    var currentTodos = getElementFromLocalStorage(old_current_todo_list_key);
    var completedTodos = getElementFromLocalStorage(old_completed_todo_list_key);

    saveElementToLocalStorage(newListName + '.' + CURRENT_TODOS_NAME_KEY, currentTodos);
    saveElementToLocalStorage(newListName + '.' + COMPLETED_TODOS_NAME_KEY, completedTodos);

    localStorage.removeItem(old_current_todo_list_key);
    localStorage.removeItem(old_completed_todo_list_key);
}

function removeListFromLocalStorage(oldName, newName, currentLists) {
    saveElementToLocalStorage(CURRENT_LIST_NAME_KEY, newName);
    saveElementToLocalStorage(LIST_NAMES_KEY, currentLists);
    removeElementFromLocalStorage(oldName + '.' + CURRENT_TODOS_NAME_KEY);
    removeElementFromLocalStorage(oldName + '.' + COMPLETED_TODOS_NAME_KEY);
}

function addListToLocalStorage(listName, currentLists) {
    if (currentLists.indexOf(listName) === -1) {
        currentLists.push(listName);
        saveElementToLocalStorage(LIST_NAMES_KEY, currentLists);
        saveElementToLocalStorage(CURRENT_LIST_NAME_KEY, listName);
    }
}

function saveTodosToLocalStorage(listName, currentTodosList, completedTodosList) {
    saveElementToLocalStorage(listName + '.' + CURRENT_TODOS_NAME_KEY, currentTodosList);
    saveElementToLocalStorage(listName + '.' + COMPLETED_TODOS_NAME_KEY, completedTodosList);
}

function updateName(oldName, newName, currentLists) {
    var index = currentLists.indexOf(oldName);
    if (index !== -1) {
        currentLists.splice(index, 1, newName);
        saveElementToLocalStorage(LIST_NAMES_KEY, currentLists);
        saveElementToLocalStorage(CURRENT_LIST_NAME_KEY, newName);
        replaceLocalStorageTodos(oldName, newName);
    } else {
        alert("Error! Couldn't change list name.");
    }
}

function changeCurrentListInLocalStorage(newListName) {
    saveElementToLocalStorage(CURRENT_LIST_NAME_KEY, newListName);
}