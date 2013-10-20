function newListCtrl($scope) {

    $scope.addList = function (newListName) {
        createNewCurrentListToLocalStorage(newListName);
        window.location.replace('index.html');
    }
}