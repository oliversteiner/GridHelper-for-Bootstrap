/*!
 * GridHelper for Bootstrap v0.1 (http://mollo.com/gridHelpter)
 * Copyright 2015 Oliver Steiner
 * Licensed under MIT (https://github.com/twbs/GridHelper_for_bootstrap/blob/master/LICENSE)
 */

// GridHelper CLASS DEFINITION
// ======================

function GridHelper() {
    this.viewport = null;
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

    console.log(this.viewport);
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


    var regex = new RegExp("col-" + this.viewport + "-([0-9+]{1,2})");

    var all_cols_with_viewport = $(".ghb-col").filter(function () {
        return ((" " + this.className + " ").match(regex) != null);
    });

    //  console.log(all_cols_with_viewport);


    $.each(all_cols_with_viewport, function () {

        var class_names = (" " + $(this).attr('class') + " ").match(regex);
        if (class_names) {
            var number_from_class = parseInt(class_names[1], 10);
        }

        console.log($(this).children().children());
        console.log();

        console.log(number_from_class);

        $(this).children().children('.ghb-info-col').html(number_from_class);

    });


    //    var orig = "col-" + this.viewport + "-" + number[1];

    //   console.log(orig);


    // $(this).prepend('<span class="gridhelper-col-container" data-old="' + orig + '" data-col="' + this.viewport + '"><div class="gridhelper-col-container-click">' + number[1] + '</div></span>');


}


// OLD CODE
// ======================

function showColInfos() {
    var elem1 = document.getElementById("responsive-status");
    //   var colstatus = window.getComputedStyle(elem1, ':after').getPropertyValue('content'); // TODO remove

    $('span.gridhelper-col-container').remove();

    var cols_spezial = $("[class*=col-" + colstatus + "]");
    var cols_spezial_offset = $("[class*=col-" + colstatus + "-offset-]");

    cols_spezial.css({}).each(function () {
        var regex = new RegExp("col-" + colstatus + "-([0-9+]{1,2})");
        var number = $(this).attr("class").match(regex);
        var orig = "col-" + colstatus + "-" + number[1];

        $(this).prepend('<span class="gridhelper-col-container" data-old="' + orig + '" data-col="' + colstatus + '"><div class="gridhelper-col-container-click">' + number[1] + '</div></span>');
    });

    cols_spezial_offset.css({}).each(function () {
        var regex = new RegExp("col-" + colstatus + "-offset-([0-9+]{1,2})");
        var number = $(this).attr("class").match(regex);
        var orig = "col-" + colstatus + "-offset-" + number[1];

        $(this).prepend('<span class="gridhelper-col-container" data-old-offset="' + orig + '" data-col="' + colstatus + '"><div class="gridhelper-col-container-offset-click">-' + number[1] + '</div></span>');
    });
}


function showColDivs() {
    //var css = $("<link>", {
    //    "rel": "stylesheet",
    //    "type": "text/css",
    //    "href": "../css/develop.css"
    //})[0];
    //
    //document
    //    .getElementsByTagName("head")[0]
    //    .appendChild(css);
}

function responsive_state() {
    return $('.responsive-state').css('width');
}

function changeCol(elem, offset) {
    console.log(elem, offset);

    var id = Math.floor((Math.random() * 10000) + 1);
    id = "input_" + id;
    var nummer = elem.childNodes[0].textContent;

    var input_select = inputElemSelect('inseldebug', nummer, id, offset);

    $(input_select).insertBefore(elem);

    $(elem).hide();


}


function activateChanger() {
    $('.gridhelper-col-container-click').click(function () {
        changeCol(this, false);
    });

    $('.gridhelper-col-container-offset-click').click(function () {
        changeCol(this, true);
    })


}

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

});