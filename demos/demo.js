// BLANK
var test = {
    "id": "",
    "author": "OST",
    "name": "blank",
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

console.log("start");


$.getJSON("./blank.json", function (data) {

    var root = document.createElement('div');
    $(root).addClass('container');

    $.each(data, function (key, value) {

        /*        "id": "",
         "author": "OST",
         "name" :"blank",
         "rows": []*/

   //     console.log("key: " + key + " - " + value);
    });

   // console.log(data['rows']);
    var next = data['rows'];

    $.each(next, function (key, rows) {
   //     console.log("next: " + key + " - " + rows);
        console.log("New Row");

        var elem_row = document.createElement('div');
        $(elem_row).addClass('row');
        $(elem_row).attr('id', rows['id']);
        root.appendChild(elem_row);

        // ROWS
        $.each(rows, function (key, value) {
     //       console.log("row: " + key + " - " + value);


            // CELLS
        //    console.log("cells - " + rows['cells']);
            var cells = rows['cells'];


            $.each(cells, function (cell, attr) {
                console.log("    New cell");


                //   console.log("cells2: " + key + " - " + value);
                var elem_cell = document.createElement('div');
                console.log(attr['id']);
                console.log(attr['content']);
              //  console.log(attr['class']);

                $(elem_cell).addClass( 'cell');
                $(elem_cell).addClass( attr['class']);
                $(elem_cell).attr('id', attr['id']);
                $(elem_cell).html( attr['id']);


                $.each(attr, function (key, value) {
                    /*  "id": "",
                     "content": "",
                     "class": []
                     ]*/

                    console.log("     cells: " + key + " - " + value);



                    //each CELL
                  //  console.log("cell: " + key + " - " + value);



                    /*

                     var elem_cell = document.createElement('div');
                     $(elem_cell).addClass('cell');
                     $(elem_cell).attr('id', name);
                     elem_row.appendChild(elem_cell);

                     $.each(row, function (name, cell) {
                     console.log("cell: " + name + " - " + cell);



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

                     });


                     });
                     */

                });
                console.log("    -----"); // new Cell
                elem_row.appendChild(elem_cell);

            });


        });
        console.log("    -----"); // new Cell // new Row


    });



    $(document).ready(function () {
        $("#input").append(root);
    });

})
;




