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
    this.addInfoPanel();
    this.initInfoPanelCol();


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

GridHelper.prototype.addInfoPanel = function () {

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

GridHelper.prototype.initInfoPanelCol = function () {
    this.resetInfoPanelCol();

    // find all divs with current viewport
    var regex = new RegExp("col-" + this.viewport + "-([0-9+]{1,2})");
    var regex_offset = new RegExp("col-" + this.viewport + "-offset-([0-9+]{1,2})");

    // col
    var all_cols_with_viewport = $(".ghb-col").filter(function () {
        return ((" " + this.className + " ").match(regex) != null);
    });

    $.each(all_cols_with_viewport, function () {

        var class_names = (" " + $(this).attr('class') + " ").match(regex);
        if (class_names) {
            var col_number = parseInt(class_names[1], 10);
        }


        var elem = $(this).children().children('.ghb-info-col').html(col_number);
        elem.html(col_number);
        gridhelper.addInputs(elem, col_number);

    });


    // col-offset
    var all_cols_with_viewport_offset = $(".ghb-col").filter(function () {
        return ((" " + this.className + " ").match(regex_offset) != null);
    });

    $.each(all_cols_with_viewport, function () {

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


        var elem = $(this).children().children('.ghb-info-offset').html(col_number);
        elem.html(col_number);
        gridhelper.addInputs(elem, col_number);

    });


}


// reset InfoPanel Col
// ======================

GridHelper.prototype.resetInfoPanelCol = function () {
    $('.ghb-info-col').html(0);
}


// init Input:selects on InfoPanel
// ======================

GridHelper.prototype.addInputs = function (elem, col_number) {

    var randomnumber = Math.floor((Math.random() * 10000) + 1);
    var id = "input_" + randomnumber;
    var input_select = this.inputElemSelect('ghb-select', col_number, id, false);

    elem.html(input_select);
    
}


// inputElemSelect
// ======================

GridHelper.prototype.inputElemSelect = function (c, s, id, offset) {
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


// OLD CODE
// ======================




function changeColNumber(id) {
    var elem = $("#" + id);
    var nummer = elem.val();

    console.log('changeColNumber');

    console.log(id);


    var colstatus = $(elem).parent().attr('data-col');

    console.log("colstatus=" + colstatus);


    var oldClass = $(elem).parent().attr('data-old');

    var newClass = "col-" + colstatus + "-" + nummer;


    console.log("oldClass=" + oldClass);
    console.log("newClass=" + newClass);

    $(elem).parent().parent().addClass(newClass);
    $(elem).parent().data('data-old', newClass);
    $(elem).parent().parent().removeClass(oldClass);


    $(elem).parents.parent().removeClass(function (i, c) {
        var m = c.match(/col{0,12}/);
        return m ? m[0] : m
    })


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
    // showColInfos();
    activateChanger();
    gridhelper.viewPort();
    gridhelper.initInfoPanelCol();

});