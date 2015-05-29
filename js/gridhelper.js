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
    this.modus = "col";
}


// init
// ======================

GridHelper.prototype.init = function () {

    this.addGripHelperMonitor();
    this.viewPort();
    this.markColumns();
    this.addColPanel();

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
    $('[data-toggle="tooltip"]').tooltip();

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
        var id = "bsh-" + random_number;

        var info_panel = '<div class="ghb-infopanel" id="' + id + '">'
            + '<div class="ghb-select ghb-info-col" data-toggle="tooltip" data-placement="top" data-original-title="col"></div>'
            + '<div class="ghb-select ghb-info-offset" data-toggle="tooltip" data-placement="top" data-original-title="offset"></div>'
            + '<div class="ghb-select ghb-info-push" data-toggle="tooltip" data-placement="top" data-original-title="push"></div>'
            + '<div class="ghb-select ghb-info-pull" data-toggle="tooltip" data-placement="top" data-original-title="pull"></div>'
            + '<div class="ghb-info-hide"></div>'
            + '<div class="ghb-info-code"></div>'
            + '</div>';

        // console.log(this);
        // add the infoPanel to each div.row >div
        $(this).prepend(info_panel);

        // add inputselect
        gridhelper.addInputs(id, 'col');
        gridhelper.addInputs(id, 'offset');
        gridhelper.addInputs(id, 'push');
        gridhelper.addInputs(id, 'pull');

        // add popover
        gridhelper.addPopover(id);

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
            // console.log(id);
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
    var col_number = "0";

    var mod = "";

    switch (modus) {
        case "offset":
            mod = "-offset";
            break;
        case "pull":
            mod = "-pull";
            break;
        case "push":
            mod = "-push";
            break;
        default :
            mod = "";
            break;
    }

    var elem = $("#" + id).parent();
    var all_names = elem.attr('class');

    //  console.log(all_names);

    var regex = new RegExp("col-" + this.viewport + mod + "-([0-9+]{1,2})");
    // console.log(regex);


    var class_names = (" " + all_names + " ").match(regex);

    if (class_names) {
        //console.log(class_names[1]);
        col_number = parseInt(class_names[1], 10);

    }

    if (isNaN(col_number)) {
        col_number = 0;
    }

    // console.log(col_number);
    // console.log('--');

    return col_number;

}


// show computed classes
// ======================

GridHelper.prototype.addPopover = function (id) {
    var status;
    // console.log("addPopover " + id);

    if (id != null) {

        var all_class_names = this.getClassNames(id);

        var html = '<a tabindex="0" ' +
            'id="#popover_' + id + '"' +
            'role="button" ' +
            'onclick="gridhelper.updateClassNames(\''+ id +'\');" ' +
            'rel="gh-popover" ' +
            'class="btn-small"' +
            'data-toggle="popover" ' +
            'data-html="true" ' +
            'data-contentwrapper="#popover_data_' + id + '"' +
            'data-content="' +
            '">' +
            '<span class="glyphicon glyphicon-comment" aria-hidden="true"></span>' +
            '</a><div style="display: none" id="popover_data_' + id + '">' +
            all_class_names +
            '</div>';


        $("#" + id).children('.ghb-info-code').html(html);

        status = true;
    }
    else {
        status = false
    }

    return status;

};

// show computed classes
// ======================

GridHelper.prototype.updateClassNames = function (id) {

    var html = this.getClassNames(id);
    $('#popover_data_' + id).html(html);


}
// show computed classes
// ======================

GridHelper.prototype.updatePopover = function (id) {

    var html = this.getClassNames(id);
    $('#' + id).children('.ghb-info-code').children().children().children().html(html);

}


// show computed classes
// ======================

GridHelper.prototype.getClassNames = function (id) {

    var html_names = null;

    var all_class_names = $("#" + id).parent().attr("class");

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

        gridhelper.addInputs(id, 'col');
        gridhelper.addInputs(id, 'offset');
    });


};


// init Input:selects on InfoPanel
// ======================

GridHelper.prototype.addInputs = function (id, modus) {

    var html = this.inputElemSelect(id, modus);
    $("#" + id).children('.ghb-info-' + modus).html(html);

};


// inputElemSelect
// ======================

GridHelper.prototype.inputElemSelect = function (id, modus) {

    var selected = "";
    var col_number = this.getColNumber(id, modus);

    // console.log("inputElemSelect - " + col_number + " - " + modus);

    var html = "<select onchange = gridhelper.updateColNumber('" + id + "','" + modus + "') class='ghb-select' id='" + modus + "_" + id + "'>";

    for (var i = 0; i <= 12; i++) {
        if (col_number == i) {
            selected = "selected";
        }
        else {
            selected = "";
        }
        html = html + "<option " + selected + " value = '" + i + "'>" + i + "</option>";
    }
    html = html + "</select>";

    //  console.log(html);
    return html;
};


// updateColNumber
// ======================

GridHelper.prototype.updateColNumber = function (id, mod) {

    var modus = "";

    switch (mod) {
        case "offset":
            modus = "offset";
            break;
        case "pull":
            modus = "pull";
            break;
        case "push":
            modus = "push";
            break;
        default :
            modus = "col";
            break;
    }

    var elem = $("#" + modus + "_" + id);
    var root = $("#" + id).parent();
    gridhelper.modus = modus;
    if (modus == "col") {
        gridhelper.modus = "";
    }

    // console.log("elem - " + "#" + modus + "_" + id);
    // console.log("root - " + root);

    var col_number = elem.val();
    // console.log("elem - " + col_number);

    if (modus == "col") {
        var newClass = "col-" + this.viewport + "-" + col_number;
    } else {
        var newClass = "col-" + this.viewport + "-" + modus + "-" + col_number;

    }

    //  console.log("newClass = " + newClass);
    //  console.log("viewport = " + this.viewport);
    //  console.log("root =" + root.attr('class'));

    root.removeClass(function (index, css) {
        // col-md-offset-4
        var regex = new RegExp("col-" + gridhelper.viewport + "-" + gridhelper.modus + "[0-9+]{1,2}");
        // console.log(regex);
        var m = css.match(regex);
        return m ? m[0] : m
        // console.log("oldClass = " + m);

    });

    root.addClass(newClass);
    //  console.log("- - - -  - " );


    this.updatePopover(id);

};

// hide Popovers
// ======================

GridHelper.prototype.hideAllPopovers = function () {

    $('[rel=gh-popover]').popover('hide');
    $('#gridhelper-popover-picto').removeClass('active');

    this.on_popover = false;
};

// show Popovers
// ======================

GridHelper.prototype.showAllPopovers = function () {

    $('[rel=gh-popover]').popover('show');
    $('#gridhelper-popover-picto').addClass('active');
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
    var all_col = $('.ghb-col');
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

    this.markColumns();

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
        + "<div><span  id='responsive-status'></span>"
        + "<a id='gridhelper-popover-button'class='btn'><span id='gridhelper-popover-picto' class='glyphicon glyphicon-comment' aria-hidden='true'></span></a>"
        + "</div>"
        + "</div>";


    $('body').append(html);

};


// addTootlip
// ======================

GridHelper.prototype.addToolTip = function () {

    $(".tip-top").tooltip({placement: 'top', title: 'test'});
}


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






