function editListCtrl($scope) {

    $scope.listNames = getAllListNamesFromLocalStorage();
    $scope.currentListName = getCurrentListFromLocalStorage();

    $scope.updateName = function (newListName) {
        if (newListName !== $scope.currentListName) {
            updateName($scope.currentListName, newListName, $scope.listNames)
        }

        window.location.replace('index.html');
    };

    $scope.getCurrentListName = function () {
        return $scope.currentListName;
    }


}