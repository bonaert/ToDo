function newListCtrl($scope) {
    var LIST_NAMES_KEY = 'all.list.names';
    var CURRENT_LIST_NAME_KEY = 'list.current_list_name';
    $scope.listNames = getFromLocalStorage(LIST_NAMES_KEY) || ['Default'];

    $scope.addList = function (listName) {
        if ($scope.listNames.indexOf(listName) === -1) {
            $scope.listNames.push(listName);
            saveToLocalStorage(LIST_NAMES_KEY, $scope.listNames);
            saveToLocalStorage(CURRENT_LIST_NAME_KEY, listName);
        }
        window.location.replace('index.html');
    }
}