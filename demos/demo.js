// BLANK
var test ={
    "id": "",
    "author": "OST",
    "name" :"blank",
    "rows": [
    {
        "id": "row-1",
        "cells": [
            {
                "id": "",
                "content": "",
                "class": [
                    "col-md-2",
                    "col-lg-4"
                ]
            },
            {
                "id": "",
                "content": "",
                "class": [
                    "col-md-2",
                    "col-lg-4"
                ]
            },
            {
                "id": "",
                "content": "",
                "class": [
                    "col-md-2",
                    "col-lg-4"
                ]
            }
        ]
    },
    {
        "id": "row-2",
        "cells": [
            {
                "id": "",
                "content": "",
                "class": [
                    "col-md-2",
                    "col-lg-4"
                ]
            },
            {
                "id": "",
                "content": "",
                "class": [
                    "col-md-2",
                    "col-lg-4"
                ]
            },
            {
                "id": "",
                "content": "",
                "class": [
                    "col-md-2",
                    "col-lg-4"
                ]
            }
        ]
    },
    {
        "id": "row-3",
        "cells": [
            {
                "id": "",
                "content": "",
                "class": [
                    "col-md-2",
                    "col-lg-4"
                ]
            },
            {
                "id": "",
                "content": "",
                "class": [
                    "col-md-2",
                    "col-lg-4"
                ]
            },
            {
                "id": "",
                "content": "",
                "class": [
                    "col-md-2",
                    "col-lg-4"
                ]
            }
        ]
    }
]
};


$.getJSON("./blank.json", function (data) {

    var root = document.createElement('div');
    $(root).addClass('container');

    $.each(data, function (key, value) {
        console.log("key: " + key + " - " + value);

        $.each(value, function (name, scelet) {
            console.log("name: " + name + " - " + scelet);

            $.each(scelet, function (name, row) {

                //each ROW
                console.log("row: " + name + " - " + row);

                var elem_row = document.createElement('div');
                $(elem_row).addClass('row');
                $(elem_row).attr('id', name);

                root.appendChild(elem_row);

                $.each(row, function (name, cell) {
                    console.log("cell: " + name + " - " + cell);

                    var elem_cell = document.createElement('div');
                    $(elem_cell).addClass('cell');
                    $(elem_cell).attr('id', name);

                    var classnames = "test";

                    $.each(cell, function (name, classes) {
                        console.log("cell: " + name + " - " + classes);

                        var i = 0;

                        $.each(cell, function (modes, number) {

                            console.log("modes: " + modes + " - " + number);
                            classnames += " " + modes + "-" + number;
                            i++;
                        });

                        console.log("classname- " + classnames);
                        $(elem_cell).addClass(classnames);
                        $(elem_cell).html(classnames);
                        elem_row.appendChild(elem_cell);

                    });


                });
            });
        });
    });
    $(document).ready(function () {
        $("#input").append(root);
    });

})
;




