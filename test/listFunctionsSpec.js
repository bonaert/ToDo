describe("Lists", function () {

    var listName = 'Scream';
    var otherListName = 'Shout';
    var allListNames = ['Default', 'ListA', 'AnotherList', 'And a final list'];
    var currentTodos = ['Eat breakfast', 'Take a shower', 'Go to the dentist'];
    var completedTodos = ['Buy milk', 'Go to DEFCON', 'Explore the attic'];

    beforeEach(function () {
        localStorage.clear();
    });

    it("saves and retrieves current list", function () {
        saveCurrentListNameToLocalStorage(listName);
        expect(getCurrentListFromLocalStorage()).toBe(listName);
    });

    it("saves and retrieves all list names", function () {
        saveAllListNamesToLocalStorage(allListNames);
        expect(getAllListNamesFromLocalStorage()).toEqual(allListNames);
    });

    it("saves and retrieves current todos", function () {
        saveCurrentTodosToLocalStorage(listName, currentTodos);
        expect(getCurrentTodosOfListFromLocalStorage(listName)).toEqual(currentTodos);
    });

    it("saves and retrieves completed Todos", function () {
        saveCompletedTodosToLocalStorage(listName, completedTodos);
        expect(getCompletedTodosOfListFromLocalStorage(listName)).toEqual(completedTodos);
    });




    it("returns 'Default' as current list name when nothing is found in local storage", function () {
        expect(getCurrentListFromLocalStorage()).toBe('Default');
    });

    it("returns ['Default'] as all list names when nothing is found in local storage", function () {
        expect(getAllListNamesFromLocalStorage()).toEqual(['Default']);
    });

    it("returns [] as current todos when nothing is found in local storage", function () {
        expect(getCurrentTodosOfListFromLocalStorage(listName)).toEqual([]);
    });

    it("returns [] as completed todos when nothing is found in local storage", function () {
        expect(getCompletedTodosOfListFromLocalStorage(listName)).toEqual([]);
    });



    it("removes current todos of list", function () {
        saveCurrentTodosToLocalStorage(listName, currentTodos);
        removeCurrentTodosFromLocalStorage(listName);
        expect(getCurrentTodosOfListFromLocalStorage(listName)).toEqual([]);
    });

    it("removes completed todos of list", function () {
        saveCompletedTodosToLocalStorage(listName, completedTodos);
        removeCompletedTodosFromLocalStorage(listName);
        expect(getCompletedTodosOfListFromLocalStorage(listName)).toEqual([]);
    });


    it("replaces todos for list name changes", function() {
        saveCurrentListNameToLocalStorage(listName);
        saveCurrentTodosToLocalStorage(listName, currentTodos);
        saveCompletedTodosToLocalStorage(listName, completedTodos);

        saveCurrentListNameToLocalStorage(listName);
        replaceLocalStorageTodos(listName, otherListName);

        expect(getCurrentTodosOfListFromLocalStorage(otherListName)).toEqual(currentTodos);
        expect(getCompletedTodosOfListFromLocalStorage(otherListName)).toEqual(completedTodos);
    });

    it("add list to local storage", function(){
        createNewCurrentToLocalStorage(listName);
        expect(getCurrentListFromLocalStorage()).toBe(listName);
        expect(getAllListNamesFromLocalStorage()).toEqual(['Default', listName]);
    });

    it("add list only once to local storage", function(){
        createNewCurrentToLocalStorage(listName);
        expect(getCurrentListFromLocalStorage()).toBe(listName);
        expect(getAllListNamesFromLocalStorage()).toEqual(['Default', listName]);

        createNewCurrentToLocalStorage(listName);
        expect(getCurrentListFromLocalStorage()).toBe(listName);
        expect(getAllListNamesFromLocalStorage()).toEqual(['Default', listName]);
    });

    it("updates name of list in local storage", function(){
        saveCurrentListNameToLocalStorage(listName);
        saveCurrentTodosToLocalStorage(listName, currentTodos);
        saveCompletedTodosToLocalStorage(listName, completedTodos);

        changeListNameInLocalStorage(listName, otherListName);

        expect(getCurrentListFromLocalStorage()).toBe(otherListName);

        expect(getAllListNamesFromLocalStorage()).toContain(otherListName);
        expect(getAllListNamesFromLocalStorage()).not.toContain(listName);

        expect(getCurrentTodosOfListFromLocalStorage(otherListName)).toEqual(currentTodos);
        expect(getCompletedTodosOfListFromLocalStorage(otherListName)).toEqual(completedTodos);

    });


});