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

    $scope.currentListName = getCurrentListFromLocalStorage();
    $scope.currentTodos = getCurrentTodosOfListFromLocalStorage($scope.currentListName);
    $scope.completedTodos = getCompletedTodosOfListFromLocalStorage($scope.currentListName);


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
        saveTodosInLocalStorage();
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
        addTodoToTodoList(newTodoText);
        saveTodosInLocalStorage();
    };

    function addTodoToTodoList(newTodoText) {
        if (newTodoText) {
            var todo = {text: newTodoText};
            $scope.currentTodos.push(todo);
        }
    }

    $scope.changeText = function (todo, editedTodoText) {
        changeTodoText(editedTodoText, todo);
        saveTodosInLocalStorage();
    };


    function changeTodoText(editedTodoText, todo) {
        var newTextHasCharacters = editedTodoText.length !== 0;
        if (newTextHasCharacters) {
            updateTodoText(todo, editedTodoText);
        }
    }

    function updateTodoText(todo, editedTodoText) {
        var index = $scope.currentTodos.indexOf(todo);
        $scope.currentTodos[index] = {text: editedTodoText};
        todo.text = editedTodoText;
    }


    $scope.deleteCompletedTodo = function (todo) {
        deleteTodoFromList($scope.completedTodos, todo);
        saveTodosInLocalStorage();
    };

    var deleteTodoFromList = function (todoList, todo) {
        var index = todoList.indexOf(todo);
        if (index > -1) {
            todoList.splice(index, 1);
        }
    };


    function transferElement(todo, oldArray, newArray) {
        // Allow us to restore only one todo, even if various have the same name
        var i;
        for (i = 0; i < oldArray.length; i++) {
            if (oldArray[i] === todo) {
                var removedTodo = oldArray.splice(i, 1)[0];
                newArray.push(removedTodo);
                saveTodosInLocalStorage();
                return;
            }
        }
    }


    function saveTodosInLocalStorage() {
        saveTodosToLocalStorage($scope.currentListName, $scope.currentTodos, $scope.completedTodos);
    }


}]);


