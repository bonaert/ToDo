angular.module('myApp', []);

angular.module('myApp').controller('manageListCtrl', ['$scope', function ($scope) {
    var LIST_NAMES_KEY = 'all.list.names',
        CURRENT_LIST_NAME_KEY = 'list.current_list_name',
        CURRENT_TODOS_NAME_KEY = 'current_todos_name',
        COMPLETED_TODOS_NAME_KEY = 'completed_todos_name';

    $scope.listNames = getElementFromLocalStorage(LIST_NAMES_KEY) || ['Default'];
    $scope.currentListName = getElementFromLocalStorage(CURRENT_LIST_NAME_KEY) || 'Default';

    $scope.chooseList = function (listName) {
        $scope.currentListName = listName;
        saveElementToLocalStorage(CURRENT_LIST_NAME_KEY, $scope.currentListName);
        window.location.replace('index.html');
    };

    var removeListFromLocalStorage = function (listName) {
        saveElementToLocalStorage(CURRENT_LIST_NAME_KEY, $scope.currentListName);
        saveElementToLocalStorage(LIST_NAMES_KEY, $scope.listNames);
        removeElementFromLocalStorage(listName + '.' + CURRENT_TODOS_NAME_KEY);
        removeElementFromLocalStorage(listName + '.' + COMPLETED_TODOS_NAME_KEY);
    };


    $scope.deleteList = function (listName) {

        /* If we delete the last element, rebuild default */
        if (listName !== 'Default' && $scope.listNames.length <= 1) {
            $scope.currentListName = 'Default';
            $scope.listNames = ['Default'];
            localStorage.clear();
            return;
        }


        var index = $scope.listNames.indexOf(listName);
        if (index > -1) {
            $scope.listNames.splice(index, 1);
        }

        if ($scope.currentListName == listName) {
            $scope.currentListName = $scope.listNames[0];
        }

        if ($scope.listNames.length === 0) {
            $scope.currentListName = 'Default';
            $scope.listNames = ['Default'];
        }

        removeListFromLocalStorage(listName);
    }

}
]);