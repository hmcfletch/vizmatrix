var outerProps = {
    width:null,
    height:null,
    top:null,
    left:null
};

var innerProps = {
    left:0,
    top:0
};

function load() {
    var outerContainer = $('#outer_container');
    outerProps.width = outerContainer.width();
    outerProps.height = outerContainer.height();

    var outerOffset = outerContainer.offset();
    outerProps.top = outerOffset.top;
    outerProps.left = outerOffset.left;
    
    var container = $('#inner_container');

    var innerOffset = container.offset();
    innerProps.left = innerOffset.left;
    innerProps.top = innerOffset.top;

    initCrosshairs();
    container.bind("mouseover",showCrosshairs);
    container.bind("mouseout",hideCrosshairs);
    container.height(matrixHeight*cellsize);
    container.width(matrixWidth*cellsize);
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "rgb(0,0,255)";
    for ( var i in data2 ) {
        for ( var j in data2[i] ) {
            //var newDiv = $('<div>');
            //newDiv.addClass('blue');

            var topPos = j * cellsize;
            var leftPos = i * cellsize;
            //newDiv.css({ "top" : topPos, "left" : leftPos });
            //container.append(newDiv);

            // draw rect on canvas
            ctx.fillRect(leftPos,topPos,cellsize,cellsize);
        }
    }
    $("#inner_container").draggable({
        opacity: "0.6",
        drag: moveMatrix,
        distance: 5,
    });
}

function displayValue(event) {
    var valueDiv = $("#value");
    var str = "i = " + this.getAttribute("i") + ", j = " + this.getAttribute("j") + " => " + this.getAttribute("value");
    valueDiv.html(str);
}

function moveMatrix(event, ui) {
    innerProps.left = parseInt(ui.position.left);
    innerProps.top = parseInt(ui.position.top);
}

function initCrosshairs() {
    var target = $('#inner_container');
    var horDiv = $('<div>');
    horDiv.attr("id","horDiv");
    horDiv.width(outerProps.width);
    var vertDiv = $('<div>');
    vertDiv.attr("id","vertDiv");
    vertDiv.height(outerProps.height);
    var outer = $('#outer_container');
    horDiv.hide();
    vertDiv.hide();
    outer.append(horDiv)
    outer.append(vertDiv);
}

function moveCrosshair(event) {
    var cursor = getCursorPosition(event);
    var innerOffset = $("#inner_container").offset();
    var i = parseInt(cursor.x - outerProps.left - innerOffset.left - 2);
    var j = parseInt(cursor.y - outerProps.top - innerOffset.top - 2);
    var a = innerOffset.left - innerProps.left;
    var b = innerOffset.top - innerProps.top;
    $("#debug").html(innerOffset.left + " * " + innerProps.left + " * " + cursor.x + " * " + innerOffset.top + " * " + innerProps.top + " * " + cursor.y);
    //$("#debug").html(a + " - " + b);
    var x = parseInt(cursor.x - outerProps.left - 2);
    var y = parseInt(cursor.y - outerProps.top - 2);
    if ( ! x || !y ) {
        return;
    }
    var val = 0;
    if ( data2[i]&& data2[i][j] ) {
        val = data2[i][j];
    }
    // move crosshair divs
    var horDiv = $('#horDiv');
    var vertDiv = $('#vertDiv');
    horDiv.css( { "top" : y } );
    vertDiv.css( { "left" : x } );
    $("#value").html("x: " + i + ",y: " + j + " => " + val);
}

function showCrosshairs(event) {
    $("#inner_container").mousemove(moveCrosshair);
    $("#horDiv").show();
    $("#vertDiv").show();
}

function hideCrosshairs(event) {
    $("#horDiv").hide();
    $("#vertDiv").hide();
    $("#inner_container").mousemove(null);
}

function getPos(obj) {
    var curleft = curtop = 0;
    if ( obj.offsetParent ) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while ( obj = obj.offsetParent );
        return [curleft,curtop];
    }
}

function getCursorPosition(e) {
    var cursor = {x:0, y:0};
    if ( e.pageX || e.pageY ) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    }
    else {
        cursor.x = e.clientX +
            (document.documentElement.scrollLeft ||
            document.body.scrollLeft) - 
            document.documentElement.clientLeft;
        cursor.y = e.clientY +
            (document.documentElement.scrollTop ||
            document.body.scrollTop) - 
            document.documentElement.clientTop;
    }
    return cursor;
}
