/*!
 * GridHelper for Bootstrap v0.1 (http://mollo.com/gridHelpter)
 * Copyright 2015 Oliver Steiner
 * Licensed under MIT (https://github.com/twbs/GridHelper_for_bootstrap/blob/master/LICENSE)
 */



// GridHelper Options
// ======================

var options = {
    start: 'auto',     // auto | click | silent
    position: 'center',     // left | center | right
    popover_trigger: 'click'  // click | hover | focus | manual.
};


// Init Class
// ======================
$(document).ready(function () {
    gridhelper = new GridHelper(options);
    gridhelper.init();
});

// update the information on resizing
$(window).resize(function () {
    gridhelper.viewPort();
    gridhelper.initColPanel();
});


// GridHelper CLASS DEFINITION
// ======================

function GridHelper(options) {
    this.viewport = 0;
    this.on = 0;
    this.on_silent = 0;
    this.on_popover = 0;
    this.options = options;

}


// init
// ======================

GridHelper.prototype.init = function () {

    this.addGripHelperMonitor();
    this.viewPort();
    this.markColumns();
    this.addColPanel();
    this.initColPanel();

    this.on = true;


    $('#gridhelper-onoff-button').click(function () {
        gridhelper.toggle();
    });

    $('#gridhelper-popover-button').click(function () {
        gridhelper.toggleAllPopovers();
    });


    // Start Options
    if (this.options.start == 'click') {
        this.hide();
    }
    // to start manually: type in console: 'gridhelper.go()'
    else if (this.options.start == 'silent') {
        this.silent();
    }

    // Options and Init of Popover with Classnames
    $('[rel=gh-popover]').popover({
        html: true,
        trigger: this.options.popover_trigger,
        placement: 'right',
        content: function () {
            return $($(this).data('contentwrapper')).html();
        }
    });
};

// viewport
// ======================

GridHelper.prototype.viewPort = function () {

    var width = $(window).width();
    //  console.log(width);

    if (width <= 480) {
        // XXS - violet
        // Landscape phones and smaller */
        // max-width: 480px
        this.viewport = 'xxs';
        $('gridhelper-popover-button').addr('class', 'eas');
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
        // LG - green
        // Large desktops and laptops
        // min-width: 1200px
        this.viewport = 'lg';
    }

    else {
        this.viewport = null;

    }

    // console.log(this.viewport);
    $('#responsive-status').attr('class', this.viewport);
    return this.viewport;

}


// Mark Columns
// ======================

GridHelper.prototype.markColumns = function () {

    // var all_col = $("[class*=col-]");
    var all_col = $(".row").children();

    all_col.addClass('ghb-col'); // GridHelperBootstrap-column
};


// Add InfoPanel to all Columns
// ======================

GridHelper.prototype.addColPanel = function () {

    var all_col = $(".ghb-col");


    // foreach col take all classes and show on Panel
    $.each(all_col, function () {

        // generate ID
        var random_number = Math.floor((Math.random() * 10000) + 1);
        var id = random_number;

        var info_panel = "<div class='ghb-infopanel' id='" + id + "'>"
            + "<div class='ghb-info-col'></div>"
            + "<div class='ghb-info-offset'></div>"
            + "<div class='ghb-info-push'></div>"
            + "<div class='ghb-info-pull'></div>"
            + "<div class='ghb-info-hide'></div>"
            + "<div class='ghb-info-code'></div>"
            + "</div>";

        // console.log(this);
        $(this).prepend(info_panel);

        // add inputselect
        var html1 = gridhelper.inputElemSelect(id, 'col');
        $(this).children().children('.ghb-info-col').html(html1);

        // add inputselect offset
        var html2 = gridhelper.inputElemSelect(id, 'offset');
        $(this).children().children('.ghb-info-offset').html(html2);

        // add popover
        var html3 = gridhelper.addPopover(this, id);
        $(this).children().children('.ghb-info-code').html(html3);

    })


    // add ID to infopanel
};


// init InfoPanel Col
// must be done for every change of Viewport
// but must store manually changes values
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

            var id = $(this).children().first().attr('id');
            console.log(id);
            elem.html(col_number);
            gridhelper.addInputs(elem, col_number, 'col', id);
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

        var elem_offset = $(this).children().children('.ghb-info-offset').html(col_number);
        elem_offset.html(col_number);

        var id = $(this).children().first().attr('id');
        //  gridhelper.addInputs(elem_offset, col_number, 'offset', id);

    });


};

// show computed classes
// ======================
GridHelper.prototype.getColNumber = function (id, modus) {
    var col_number = false;

    var elem = $(id).parent();

    if (modus === "offset") {
        modus = "-offset"
    } else {
        modus = "";
    }

    var regex = new RegExp("col-" + this.viewport + modus + "-([0-9+]{1,2})");

    var class_names = (" " + $(elem).attr('class') + " ").match(regex);
    if (class_names) {
        col_number = parseInt(class_names[1], 10);
    }

    if (isNaN(col_number)) {
        col_number = 0;
    }

    return col_number;
}


// show computed classes
// ======================

GridHelper.prototype.addPopover = function (elem, id) {

    //  console.log(elem);

    var all_class_names = this.getClassNames(elem);

    var html = '<a tabindex="0" ' +
        'role="button" ' +
        'rel="gh-popover" ' +
        'class="btn-small"' +
        'data-toggle="popover" ' +
        'data-html="true" ' +
        'data-contentwrapper="#popover_' + id + '"' +
        'data-content="' +
        '">' +
        '<span class="glyphicon glyphicon-comment" aria-hidden="true"></span>' +
        '</a><div style="display: none" id="popover_' + id + '">' +
        all_class_names +
        '</div>';

    return html;


};


// show computed classes
// ======================

GridHelper.prototype.getClassNames = function (elem) {

    var html_names = null;

    var all_class_names = $(elem).attr("class");

    // console.log(all_class_names);
    // put all classes in array
    var str = all_class_names.trim();
    str = str.replace('ghb-col', '');
    var arr = str.split(' ');
    arr.sort();

    // Sort the Array
    // col-xs-*
    // col-sm-*
    // col-md-*
    // col-lg-*
    // others


    //  add viewport-color
    html_names = '<ul class="popover-list">';
    arr.forEach(function (elem) {
        // add css group
        // add in list
        if (elem != '') {

            var viewport = '';

            if (elem.substring(0, 4) == 'col-') {
                viewport = elem.substring(4, 6);
            }
            html_names += '<li class="' + viewport + '">' + elem + '</li>';
        }
    });
    html_names += '</ul>';

    return html_names;

}


// reset InfoPanel Col
// ======================

GridHelper.prototype.resetInfoPanelCol = function () {

    $('.ghb-infopanel').each(function () {
        var id = $(this).attr('id');

        gridhelper.addInputs($(this), 'col', id);
        gridhelper.addInputs($(this), 'offset', id);
    });


};


// init Input:selects on InfoPanel
// ======================

GridHelper.prototype.addInputs = function (elem, modus, id) {

    //  var id = "input_" + modus + "_" + id;
    var input_select = this.inputElemSelect('ghb-select', id, modus);
    var name = '.ghb-info-' + modus;
    console.log(name)
    elem.children(name).html(input_select);

};


// inputElemSelect
// ======================

GridHelper.prototype.inputElemSelect = function (id, modus) {
    var selected = null;
    var col_number = this.getColNumber(id, modus);

    var html = "<select onchange = gridhelper.updateColNumber('" + id + "'," + modus + ") class='ghb-select' id='" + id + "'>";

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
};


// updateColNumber
// ======================

GridHelper.prototype.updateColNumber = function (id, modus) {

    if (modus == "offset") {
        var off = "offset-"
    } else {
        off = ""
    }

    var elem = $("#input_" + modus + "_" + id);
    var col_number = elem.val()


    var newClass = "col-" + this.viewport + "-" + modus + col_number;

    // console.log("elem_id= " + id);
    // console.log("viewport= " + this.viewport);
    // console.log("newClass=" + newClass);

    $(elem).parent().parent().parent().removeClass(function (i, c) {
        var regex = new RegExp("col-" + gridhelper.viewport + "-" + off + "[0-9+]{1,2}");
        var m = c.match(regex);
        // console.log("oldClass = " + m);
        return m ? m[0] : m
    });

    $(elem).parent().parent().parent().addClass(newClass);


    // Update popover classnames
    // TODO optimize this
    var new_elem = $(elem).parent().parent().parent();
    var new_class_names = this.getClassNames(new_elem);
    console.log(new_class_names);
    console.log(elem);

};

// hide Popovers
// ======================

GridHelper.prototype.hideAllPopovers = function () {

    $('[rel=gh-popover]').popover('hide');
    this.on_popover = false;
};

// show Popovers
// ======================

GridHelper.prototype.showAllPopovers = function () {

    $('[rel=gh-popover]').popover('show');
    this.on_popover = true;
};

// Toggle Popovers
// ======================

GridHelper.prototype.toggleAllPopovers = function () {

    if (this.on_popover == true) {
        this.hideAllPopovers();
    } else if (this.on_popover == false) {
        this.showAllPopovers();
    }
};


// hide
// ======================

GridHelper.prototype.silent = function () {
    this.hide();
    $('#gridhelper-monitor').hide();

    this.on_silent = true;
};

// go
// ======================

GridHelper.prototype.go = function () {
    $('#gridhelper-monitor').show();
    this.hide();

    this.on_silent = false;
};

// hide
// ======================

GridHelper.prototype.hide = function () {
    var all_col = $("[class*=col-]");
    all_col.removeClass('ghb-col'); // GridHelperBootstrap-column

    var all_panels = $(".ghb-infopanel");
    all_panels.hide();
    $('#responsive-status').hide();
    $('#gridhelper-onoff-button-bottom').show();
    $('#gridhelper-onoff-button-top').hide();
    $('#gridhelper-onoff-text').hide();
    $('#gridhelper-popover-button').hide();


    this.on = false;
};

// show
// ======================

GridHelper.prototype.show = function () {
    var all_col = $("[class*=col-]");
    all_col.addClass('ghb-col'); // GridHelperBootstrap-column}
    var all_panels = $(".ghb-infopanel");

    all_panels.show();
    $('#responsive-status').show();
    $('#gridhelper-onoff-button-bottom').hide();
    $('#gridhelper-onoff-button-top').show();
    $('#gridhelper-popover-button').show();
    $('#gridhelper-onoff-text').show();

    this.on = true;
};


// toggle
// ======================

GridHelper.prototype.toggle = function () {

    if (this.on === true) {
        this.hide();
    } else if (this.on === false) {
        this.show();
    }

};


// inputElemSelect
// ======================

GridHelper.prototype.addGripHelperMonitor = function () {

    // adjust the position depending on the options


    var html = "<div id='gridhelper-monitor' class='" + this.options.position + "'>"
        + "<a id='gridhelper-onoff-button'class='btn'>"
        + "<span id='gridhelper-onoff-text'>GridHelper</span>"
        + "<span id='gridhelper-onoff-button-top' class='glyphicon glyphicon-triangle-top' aria-hidden='true'></span>"
        + "<span id='gridhelper-onoff-button-bottom' class='btn-lg glyphicon glyphicon-triangle-bottom' aria-hidden='true' style='display: none'></span>"
        + "</a>"
        + "<div id='responsive-status'></div>"
        + "<a id='gridhelper-popover-button'class='btn'>Classes</a>"
        + "</div>";


    $('body').append(html);

};


// http://stackoverflow.com/questions/5767325/remove-specific-element-from-an-array
Object.defineProperty(Array.prototype, "removeItem", {
    enumerable: false,
    value: function (itemToRemove) {
        // Count of removed items
        var removeCounter = 0;
        // Iterate every array item
        for (var index = 0; index < this.length; index++) {
            // If current array item equals itemToRemove then
            if (this[index] === itemToRemove) {
                // Remove array item at current index
                this.splice(index, 1);

                // Increment count of removed items
                removeCounter++;
                index--;
            }
        }
        // Return count of removed items
        return removeCounter;
    }
});






