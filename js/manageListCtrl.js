angular.module('myApp', []);

angular.module('myApp').controller('manageListCtrl', ['$scope', function ($scope) {

    $scope.listNames = getAllListNamesFromLocalStorage();
    $scope.currentListName = getCurrentListFromLocalStorage();

    $scope.chooseList = function (listName) {
        changeCurrentListInLocalStorage(listName);
        window.location.replace('index.html');
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