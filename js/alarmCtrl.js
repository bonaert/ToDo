var alarmCtrl = function ($scope) {

    $scope.currentListName = getCurrentListFromLocalStorage();
    $scope.currentTodo = getCurrentTodoFromLocalStorage();
    $scope.isAlarmSet = $scope.currentTodo.isAlarmSet;
    $scope.alarmTime = null;

    function getAlarmDate(time) {

        alert(time);
        var hours = Number(time.substr(0, 2));
        var minutes = Number(time.substr(3, 2));

        var alarmDate = new Date();
        alert(alarmDate.getHours());
        var isAlarmNextDay = alarmDate.getHours() < hours || alarmDate.getHours() == hours && alarmDate.getMinutes() <= minutes;
        if (isAlarmNextDay) {
            alarmDate.setDate(alarmDate.getDate() + 1);
        }

        alert(hours);
        alarmDate.setHours(hours);
        alarmDate.setMinutes(minutes);
        return alarmDate;
    }

    var addAlarm = function (date) {
        var data = {
            "text": $scope.currentTodo.text,
            "currentListName": $scope.currentListName
        };
        window.navigator.mozAlarms.add(date, "ignoreTimezone", data);
    };


    var setAlarm = function (time) {
        var date = getAlarmDate(time);
        addAlarm(date);

    };

    function updateCurrentTodo() {
        $scope.currentTodo.isAlarmSet = !$scope.currentTodo.isAlarmSet;
        saveCurrentTodoToLocalStorage($scope.currentTodo);
    }

    function goToMainPage() {
        window.location.replace('/html/index.html');
    }

    $scope.setAlarm = function () {
        if ($scope.alarmTime != null) {
            setAlarm($scope.alarmTime);
            updateCurrentTodo();
            goToMainPage();
        }
    };

    function removeAlarm() {
        this.result.forEach(function (alarm) {
            var isAlarmEqualToCurrentAlarm = (alarm.data.text == $scope.currentTodo.text && alarm.date.currentListName == $scope.currentListName);
            if (isAlarmEqualToCurrentAlarm) {
                window.navigator.mozAlarms.remove(alarm.id);
            }
        });
    }

    $scope.deleteAlarm = function () {
        var request = window.navigator.mozAlarms.getAll();
        request.onsuccess = function () {
            removeAlarm.call(this);
            updateCurrentTodo();
            goToMainPage();
        }
    };

    $scope.isAlarmSet = function () {
        return $scope.currentTodo.isAlarmSet;
    }
};