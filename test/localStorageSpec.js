describe("Local Storage ", function () {

    it("should be available", function () {
        if (window.localStorage) {
            expect(isLocalStorageAvailable()).toBe(true);
        } else {
            expect(isLocalStorageAvailable()).toBe(false);
        }
    });

    describe("localStorage", function () {

        var keys = ["a", "b", "c", "d", "e"];
        var values = [undefined, true, 14, ['24', 7, true, {a: 'b'}], {text: '37'}];

        var nonStoredKeys = ['abcdef', 'cream', 'potato'];

        beforeEach(function () {
            localStorage.clear();
            for (var i = 0; i < keys.length; i++) {
                saveElementToLocalStorage(keys[i], values[i]);
            }
        });

        it("should stored values", function () {
            for (var i = 0; i < keys.length; i++) {
                var storedValue = localStorage.getItem(keys[i]);
                if (storedValue != 'undefined') {
                    storedValue = JSON.parse(storedValue);
                } else {
                    storedValue = undefined;
                }
                expect(storedValue).toEqual(values[i]);
            }
        });

        it("should retrieve stored values", function () {
            for (var i = 0; i < keys.length; i++) {
                var retrievedElement = getElementElementFromLocalStorage(keys[i]);
                expect(retrievedElement).toEqual(values[i]);
            }
        });

        it("should return null for non-stored values", function () {
            for (var i = 0; i < nonStoredKeys.length; i++) {
                var retrievedValue = getElementElementFromLocalStorage(nonStoredKeys[i]);
                expect(retrievedValue).toBeNull();
            }
        });

        it("should delete stored values", function () {
            for (var i = 0; i < keys.length; i++) {
                removeElementFromLocalStorage(keys[i]);
                expect(localStorage.getItem(keys[i])).toBeNull();
            }
        });

        it("should do nothing when deleteing non-stored values", function () {
            for (var i = 0; i < nonStoredKeys.length; i++) {
                removeElementFromLocalStorage(nonStoredKeys[i]);
                expect(localStorage.getItem(nonStoredKeys[i])).toBeNull();
            }
        })
    });


});

