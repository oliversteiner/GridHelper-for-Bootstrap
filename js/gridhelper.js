/*!
 * GridHelper for Bootstrap v0.1 (http://mollo.com/gridHelpter)
 * Copyright 2015 Oliver Steiner
 * Licensed under MIT (https://github.com/twbs/GridHelper_for_bootstrap/blob/master/LICENSE)
 */

// GridHelper CLASS DEFINITION
// ======================

function GridHelper() {
    this.viewport = 0;
}


// init
// ======================

GridHelper.prototype.init = function () {
    //  console.log("init gridHelper");
    $("#develop").addClass('active');
    $("#develop-start").hide();

    this.viewPort();
    this.markColumns();
    this.addColPanel();
    this.initColPanel();


};

// viewport
// ======================

GridHelper.prototype.viewPort = function () {

    var width = $(window).width();
    //  console.log(width);

    if (width <= 480) {
        // XXS - GREEN
        // Landscape phones and smaller */
        // max-width: 480px
        this.viewport = 'xxs';
    }

    else if (width < 768) {
        // XS - BLUE
        // Landscape phones and portrait tablets */
        // min-width:767px
        this.viewport = 'xs';
    }

    else if (width < 992) {
        // SM - RED
        // Portrait tablets and small desktops */
        // min-width: 768px
        // max-width: 991px
        this.viewport = 'sm';
    }

    else if (width < 1200) {
        // MD - Yellow
        //  Portrait tablets and medium desktops */
        // min-width: 992px
        // max-width: 1199px
        this.viewport = 'md';
    }

    else if (width >= 1200) {
        // LG - Violet
        // Large desktops and laptops
        // min-width: 1200px
        this.viewport = 'lg';
    }

    else {
        this.viewport = null;

    }

    // console.log(this.viewport);
    return this.viewport;

};


// Mark Columns
// ======================

GridHelper.prototype.markColumns = function () {

    var all_col = $("[class*=col-]");
    all_col.addClass('ghb-col'); // GridHelperBootstrap-column
};


// Add InfoPanel to all Columns
// ======================

GridHelper.prototype.addColPanel = function () {

    var all_col = $(".ghb-col");
    var info_panel = "<div class='ghb-infopanel'>"
        + "<div class='ghb-info-col'>0</div>"
        + "<div class='ghb-info-offset'>0</div>"
        + "<div class='ghb-info-hide'>H</div>"
        + "<div class='ghb-info-code'>CODE</div>"
        + "</div>";

    all_col.prepend(info_panel);
};


// init InfoPanel Col
// must be done for every change of Viewport
// but must store manualy changes values
// ======================

GridHelper.prototype.initColPanel = function () {
    this.resetInfoPanelCol();


    // find all divs with current viewport
    var regex = new RegExp("col-" + this.viewport + "-([0-9+]{1,2})");
    var regex_offset = new RegExp("col-" + this.viewport + "-offset-([0-9+]{1,2})");

    // col
    var all_cols_with_viewport = $(".ghb-col").filter(function () {
        return ((" " + this.className + " ").match(regex) != null);
    });

    $.each(all_cols_with_viewport, function () {

        var class_name = (" " + $(this).attr('class') + " ").match(regex);
        if (class_name) {
            var col_number = parseInt(class_name[1], 10);
            var elem = $(this).children().children('.ghb-info-col').html(col_number);
            elem.html(col_number);
            gridhelper.addInputs(elem, col_number, false);
        }
        else{
            console.log("leer");
        }




    });


    // col-offset
    var all_cols_with_viewport_offset = $(".ghb-col").filter(function () {
        return ((" " + this.className + " ").match(regex_offset) != null);
    });

    $.each(all_cols_with_viewport_offset, function () {

        var class_names = (" " + $(this).attr('class') + " ").match(regex_offset);
        if (class_names) {
            var col_number = parseInt(class_names[1], 10);
        }

        //  console.log($(this).children().children());
        //  console.log(col_number);
        if (isNaN(col_number)) {
            col_number = 0
        }
        ;


        var elem_offset = $(this).children().children('.ghb-info-offset').html(col_number);
        elem_offset.html(col_number);
        gridhelper.addInputs(elem_offset, col_number, true);

    });


}


// reset InfoPanel Col
// ======================

GridHelper.prototype.resetInfoPanelCol = function () {
    $('.ghb-info-col').html(0);
    $('.ghb-info-offset').html(0);


    $('.ghb-info-col').each(function() {
        gridhelper.addInputs($(this), 0, false);
    });

    $('.ghb-info-offset').each(function() {
        gridhelper.addInputs($(this), 0, true);
    });

}


// init Input:selects on InfoPanel
// ======================

GridHelper.prototype.addInputs = function (elem, col_number, offset) {

    var randomnumber = Math.floor((Math.random() * 10000) + 1);
    var id = "input_" + randomnumber;
    var input_select = this.inputElemSelect('ghb-select', col_number, id, offset);

    elem.html(input_select);
    
}


// inputElemSelect
// ======================

GridHelper.prototype.inputElemSelect = function (class_name, col_number, id, offset) {
    var html = null;
    var selected = null;

    html = "<select onchange = gridhelper.updateColNumber('" + id + "'," + offset + ") class='" + class_name + "' id='" + id + "'>";

    for (var i = 0; i <= 12; i++) {
        if (col_number == i) {
            selected = "selected";
        }
        else {
            selected = null;
        }
        html = html + "<option " + selected + " value = '" + i + "'>" + i + "</option>";
    }
    html = html + "</select>";

    return html;
}




// inputElemSelect
// ======================

GridHelper.prototype.updateColNumber = function ( id, offset) {

    if(true === offset){ offset = "offset-"} else{ offset = ""}

    var elem = $("#" + id);
    var col_number = elem.val();
    var newClass = "col-" + this.viewport + "-" + offset + col_number;

    console.log("elem_id= " + id);
    console.log("viewport= " + this.viewport);
    console.log("newClass=" + newClass);

    $(elem).parent().parent().parent().removeClass(function (i, c) {
        var regex = new RegExp("col-" + gridhelper.viewport + "-" + offset + "[0-9+]{1,2}");
        var m = c.match(regex);
        console.log("oldClass = "+ m);
        return m ? m[0] : m
    })

    $(elem).parent().parent().parent().addClass(newClass);



}


function inputElemSelect(c, s, id, offset) {
    var html = null;
    var selected = null;
    if (offset) {
        c = c + "-offset"
    }
    html = "<select onchange = changeColNumber('" + id + "') class='" + c + "' id='" + id + "'>";

    for (var i = 0; i <= 12; i++) {
        if (s == i) {
            selected = "selected";
        }
        else {
            selected = null;
        }
        html = html + "<option " + selected + " value = '" + i + "'>" + i + "</option>";
    }
    html = html + "</select>";

    return html;
}


$(document).ready(function () {

    gridhelper = new GridHelper('Kitty', 'Meow');
    gridhelper.init();
});

$(window).resize(function () {

    gridhelper.viewPort();
    gridhelper.initColPanel();

});