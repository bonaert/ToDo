var app = angular.module('myApp', ['ngAnimate']);

app.directive('focus', function () {
    return function (scope, element, attrs) {
        attrs.$observe('focus', function (newValue) {
            newValue === 'true' && element[0].focus();
        });
    }
});

app.controller('ShowTodoCtrl', ['$scope', function ($scope) {
    'use strict';

    var CURRENT_TODOS_NAME_KEY = 'current_todos_name',
        COMPLETED_TODOS_NAME_KEY = 'completed_todos_name',
        CURRENT_LIST_NAME_KEY = 'list.current_list_name';

    $scope.currentListName = getFromLocalStorage(CURRENT_LIST_NAME_KEY) || 'Default';
    $scope.currentTodos = getFromLocalStorage($scope.currentListName + '.' + CURRENT_TODOS_NAME_KEY) || [];
    $scope.completedTodos = getFromLocalStorage($scope.currentListName + '.' + COMPLETED_TODOS_NAME_KEY) || [];


    $scope.currentTodoEdited = null;

    /* List functions  */

    $scope.getCurrentListName = function () {
        return $scope.currentListName;
    };

    $scope.setCurrentListName = function (name) {
        $scope.currentListName = name;
    };


    /* Length functions */
    $scope.getCurrentTodosLength = function () {
        return $scope.currentTodos.length;
    };

    $scope.getCompletedTodosLength = function () {
        return $scope.completedTodos.length;
    };

    $scope.clearCompletedTodos = function () {
        $scope.completedTodos = [];
        saveTodosToLocalStorage();
    };


    /* Current todos being edited functions */
    $scope.setCurrentTodoEdited = function (todo) {
        $scope.currentTodoEdited = todo;
    };

    $scope.stoppedEditingTodo = function () {
        $scope.currentTodoEdited = null;
    };

    $scope.isTodoBeingEdited = function (todo) {
        return todo === $scope.currentTodoEdited;
    };


    /* Change todos state */
    $scope.setTodoCompleted = function (todo) {
        transferElement(todo, $scope.currentTodos, $scope.completedTodos);
    };

    $scope.restoreTodo = function (oldTodo) {
        transferElement(oldTodo, $scope.completedTodos, $scope.currentTodos);
    };

    $scope.addTodo = function (newTodoText) {
        if (newTodoText) {
            var todo = {text: newTodoText};
            $scope.currentTodos.push(todo);
        }
        saveTodosToLocalStorage();
    };

    $scope.changeText = function (todo, editedTodoText) {
        if (editedTodoText.length !== 0) {
            var index = $scope.currentTodos.indexOf(todo);
            $scope.currentTodos[index] = {text: editedTodoText, done: todo.done};
            todo.text = editedTodoText;
        }
        saveTodosToLocalStorage();
    };


    function transferElement(todo, oldArray, newArray) {
        // Allow us to restore only one todo, even if various have the same name
        var i;
        for (i = 0; i < oldArray.length; i++) {
            if (oldArray[i] === todo) {
                var removedTodo = oldArray.splice(i, 1)[0];
                newArray.push(removedTodo);
                saveTodosToLocalStorage();
                return;
            }
        }
    }


    function saveTodosToLocalStorage() {
        saveToLocalStorage($scope.currentListName + '.' + CURRENT_TODOS_NAME_KEY, $scope.currentTodos);
        saveToLocalStorage($scope.currentListName + '.' + COMPLETED_TODOS_NAME_KEY, $scope.completedTodos);
    }


}]);


