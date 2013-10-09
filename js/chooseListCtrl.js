angular.module('myApp', []);

angular.module('myApp').controller('chooseListCtrl', ['$scope', function ($scope) {
    var LIST_NAMES_KEY = 'all.list.names',
        CURRENT_LIST_NAME_KEY = 'list.current_list_name';

    $scope.listNames = getFromLocalStorage(LIST_NAMES_KEY) || ['Default'];
    $scope.currentListName = getFromLocalStorage(CURRENT_LIST_NAME_KEY) || 'Default';

    $scope.chooseList = function (listName) {
        $scope.currentListName = listName;
        saveToLocalStorage(CURRENT_LIST_NAME_KEY, $scope.currentListName);
        window.location.replace('index.html');
    };

}
]);