function listCtrl($scope) {
    function getListNameFromLocalStorage() {
        if (window.localStorage) {
            var LIST_NAMES_KEY = 'list_names_key';
            var savedListNames = localStorage.getItem(LIST_NAMES_KEY);
            if (savedListNames) {
                return savedListNames;
            } else {
                return ['Default'];
            }
        } else {
            return ['Default'];
        }
    }

    $scope.listNames = getListNameFromLocalStorage();

    $scope.addNewList = function(listName) {
        $scope.listNames.push(listName);
    }

}