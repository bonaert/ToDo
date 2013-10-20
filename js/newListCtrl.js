function newListCtrl($scope) {

    $scope.addList = function (newListName) {
        createNewCurrentToLocalStorage(newListName);
        window.location.replace('index.html');
    }
}