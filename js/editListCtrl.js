function editListCtrl($scope) {

    $scope.currentListName = getCurrentListFromLocalStorage();

    $scope.updateName = function (newListName) {
        if (newListName !== $scope.currentListName) {
            changeListNameInLocalStorage($scope.currentListName, newListName)
        }
        window.location.replace('index.html');
    };

    $scope.getCurrentListName = function () {
        return $scope.currentListName;
    }


}