/**
 * Created by ost on 24.05.15.
 */







$("#develop-start").click(function () {
    gridHelperInit();
});

function gridHelperInit() {
    console.log("init gridHelper");

    showActualSize();
    showColDivs();
    showColInfos();

    $(window).resize(function () {
        showColInfos();
        activateChanger();
    });
}

function showActualSize() {
    $("#develop").addClass('active');
    $("#develop-start").hide();
}


function showColInfos() {
    var elem1 = document.getElementById("responsive-status");
    var colstatus = window.getComputedStyle(elem1, ':after').getPropertyValue('content');

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
    var css = $("<link>", {
        "rel": "stylesheet",
        "type": "text/css",
        "href": "../css/develop.css"
    })[0];

    document
        .getElementsByTagName("head")[0]
        .appendChild(css);
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
        changeCol(this,false);
    })

    $('.gridhelper-col-container-offset-click').click(function () {
        changeCol(this,true);
    })



}

function changeColNumber(id)
{
    var elem = $("#" + id);
    var nummer = elem.val();

    console.log('changeColNumber');

    console.log(id);



    var colstatus = $(elem).parent().attr('data-col');

    console.log("colstatus="+colstatus);



    var oldClass = $(elem).parent().attr('data-old');

    var newClass = "col-" + colstatus + "-" + nummer;


    console.log("oldClass="+oldClass);
    console.log("newClass="+newClass);

    $(elem).parent().parent().addClass(newClass);
    $(elem).parent().data('data-old', newClass);
    $(elem).parent().parent().removeClass(oldClass);


    $(elem).parents.parent().removeClass(function(i, c){
        var m = c.match(/col{0,12}/);
        return m ? m[0] : m
    })


}


function inputElemSelect(c, s, id, offset) {
    var html = null;
    var selected = null;
    if(offset) {c = c+"-offset"}
    html = "<select onchange = changeColNumber('" + id + "') class='" + c + "' id='" + id + "'>";

    for (i = 0; i <= 12; i++) {
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
