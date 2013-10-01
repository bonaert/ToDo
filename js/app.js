function TodoCtrl($scope) {
    'use strict';

    var CURRENT_TODOS_NAME_GETTER_STRING = 'current_todos_name',
        COMPLETED_TODOS_NAME_GETTER_STRING = 'completed_todos_name',
        CURRENT_LIST_NAME_GETTER_STRING = 'list.current_list_name';

    $scope.currentTodos = [];
    $scope.completedTodos = [];
    $scope.currentListName = 'Default';

    if (window.localStorage) {

        /* Restore current todos from local storage*/
        var savedCurrentTodos = localStorage.getItem(CURRENT_TODOS_NAME_GETTER_STRING);
        if (savedCurrentTodos) {
            $scope.currentTodos = JSON.parse(savedCurrentTodos);
        }


        var savedCompletedTodos = localStorage.getItem(COMPLETED_TODOS_NAME_GETTER_STRING);
        if (savedCompletedTodos) {
            $scope.completedTodos = JSON.parse(savedCompletedTodos);
        }

        var savedCurrentListName = localStorage.getItem(CURRENT_LIST_NAME_GETTER_STRING);
        if (savedCurrentListName) {
            $scope.currentListName = savedCurrentListName;
        }



    }

    $scope.currentTodoEdited = null;

    /* List functions  */

    $scope.getCurrentListName = function() {
        return $scope.currentListName;
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

    $scope.changeText = function (todo, editedTodo) {
        if (editedTodo.text.length !== 0) {
            var newText = editedTodo.text;
            var index = $scope.currentTodos.indexOf(todo);
            $scope.currentTodos[index] = {text: newText, done: todo.done};
            todo.text = newText;
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


    /* Save current and completed todos*/
    function saveTodosToLocalStorage() {
        if (window.localStorage) {
            localStorage.setItem(CURRENT_TODOS_NAME_GETTER_STRING, JSON.stringify($scope.currentTodos));
            localStorage.setItem(COMPLETED_TODOS_NAME_GETTER_STRING, JSON.stringify($scope.completedTodos));
        }
    }


}