function loadGrid(json) {
    $.getJSON(json, function (data) {
        console.log("root");


        // Create Elem <div>
        var root = document.createElement('div');

        // ==================  Container  ========================
        console.log("container");


        // Create Elem <div> for Container
        var container = document.createElement('div');

        // Read the Meta-Information an add them  to Elem Container
        $.each(data, function (key, attr) {
            // id
            // author
            // name
            // rows - Array

            // Add Meta
            $(container).addClass('container');
            $(container).attr('id', data['id']);
            $(container).attr('data-author', data['author']);
            $(container).attr('data-name', data['name']);

        });

        // Add Elem Container to Elem Root
        root.appendChild(container);


        // ==================  ROWS  ========================
        var rows = data['rows'];

        $.each(rows, function (key, attr) {
            console.log(" ");
            console.log("  New Row       " + attr['id']);
            // id
            // cells - Array

            // Create Elem <div> for ROW
            var elem_row = document.createElement('div');
            $(elem_row).addClass('row');
            $(elem_row).attr('id', attr['id']);

            // Add Elem ROW to Elem Container
            container.appendChild(elem_row);


            // ==================  CELLS  ========================
            var cells = attr['cells'];

            $.each(cells, function (cell, attr) {
                console.log("    New cell    " + attr['id']);
                // id
                // content
                // class - Array

                // Create Elem <div> for Cell
                var elem_cell = document.createElement('div');
                $(elem_cell).attr('id', attr['id']);
                $(elem_cell).addClass('cell');
                $(elem_cell).html(attr['content']);

                // Classes from Array to String
                var classes = "";
                $.each(attr['class'], function (key, value) {
                    classes += " " + value;
                });
                $(elem_cell).addClass(classes);

                // Add Elem Cell to Elem Row
                elem_row.appendChild(elem_cell);

            }); // CELL

        }); // ROW

        $("#placeholder").append(root);

    });


}




