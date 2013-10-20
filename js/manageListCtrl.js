angular.module('myApp', []);

angular.module('myApp').controller('manageListCtrl', ['$scope', function ($scope) {

    $scope.listNames = getAllListNamesFromLocalStorage();
    $scope.currentListName = getCurrentListFromLocalStorage();

    $scope.chooseList = function (listName) {
        saveCurrentListNameToLocalStorage(listName);
        window.location.replace('index.html');
    };

    $scope.deleteList = function (listName) {
        var isLastElementBeingDeleted = $scope.listNames.length <= 1;
        if (isLastElementBeingDeleted) {
            replaceWithEmptyDefaultList();
        } else {
            removeListAndUpdateLocalStorage(listName);
        }
    };

    function replaceWithEmptyDefaultList() {
        $scope.currentListName = 'Default';
        $scope.listNames = ['Default'];
        localStorage.clear();
    }

    function removeListAndUpdateLocalStorage(listName) {
        removeListFromListOfListNames(listName);
        removeListTodosInLocalStorage(listName);
    }

    function removeListFromListOfListNames(listName) {
        tryToRemoveListFromListOfListNames(listName);
        updateCurrentListNameIfDeleted(listName);
    }

    function tryToRemoveListFromListOfListNames(listName) {
        var index = $scope.listNames.indexOf(listName);
        if (index > -1) {
            $scope.listNames.splice(index, 1);
        }
    }

    function updateCurrentListNameIfDeleted(listName) {
        if ($scope.currentListName == listName) {
            $scope.currentListName = $scope.listNames[0];
            saveCurrentListNameToLocalStorage($scope.currentListName);
        }
    }

}]);