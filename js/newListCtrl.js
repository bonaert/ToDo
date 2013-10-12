function newListCtrl($scope) {
    $scope.listNames = getAllListNamesFromLocalStorage();

    $scope.addList = function (newListName) {
        addListToLocalStorage(newListName, $scope.listNames);
        window.location.replace('index.html');
    }
}