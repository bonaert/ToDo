$(document).ready(function () {
    $('.ui.form')
        .form({
            listName: {
                identifier: 'listName',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter your list name'
                    },
                    {
                        type: 'contains[.]',
                        prompt: 'Please do not enter special characters'
                    }
                ]
            }
        })
    ;
})
;




