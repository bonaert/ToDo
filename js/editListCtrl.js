function editListCtrl($scope) {

    var LIST_NAMES_KEY = 'all.list.names',
        CURRENT_LIST_NAME_KEY = 'list.current_list_name',
        CURRENT_TODOS_NAME_KEY = 'current_todos_name',
        COMPLETED_TODOS_NAME_KEY = 'completed_todos_name';

    $scope.listNames = getFromLocalStorage(LIST_NAMES_KEY) || ['Default'];
    $scope.currentListName = getFromLocalStorage(CURRENT_LIST_NAME_KEY) || 'Default';

    var replaceLocalStorageItems = function (oldListName, newListName) {
        var old_current_todo_list_key = oldListName + '.' + CURRENT_TODOS_NAME_KEY;
        var old_completed_todo_list_key = oldListName + '.' + COMPLETED_TODOS_NAME_KEY;

        var currentTodos = getFromLocalStorage(old_current_todo_list_key);
        var completedTodos = getFromLocalStorage(old_completed_todo_list_key);

        saveToLocalStorage(newListName + '.' + CURRENT_TODOS_NAME_KEY, currentTodos);
        saveToLocalStorage(newListName + '.' + COMPLETED_TODOS_NAME_KEY, completedTodos);

        localStorage.removeItem(old_current_todo_list_key);
        localStorage.removeItem(old_completed_todo_list_key);
    };

    $scope.updateName = function (listName) {
        if (listName !== $scope.currentListName) {
            var index = $scope.listNames.indexOf($scope.currentListName);
            if (index !== -1) {
                $scope.listNames.splice(index, 1, listName);
                saveToLocalStorage(LIST_NAMES_KEY, $scope.listNames);
                saveToLocalStorage(CURRENT_LIST_NAME_KEY, listName);
                replaceLocalStorageItems($scope.currentListName, listName);
            } else {
                alert("Error! Couldn't change list name.")
            }
        }

        window.location.replace('index.html');
    };

    $scope.getCurrentListName = function () {
        return $scope.currentListName;
    }


}