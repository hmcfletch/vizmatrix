var validDivs = new Object();
validDivs['blue'] = true;
validDivs['white'] = true;

var outW;
var outH;
var outTop;
var outLeft;

var horDivProps = {
    style: ""
};
var vertDivProps = {
    style: ""
};

function load() {
    var outerContainer = document.getElementById('outer_container');
    outW = outerContainer.clientWidth;
    outH = outerContainer.clientHeight;
    [outLeft,outTop] = getPos(outerContainer);

    var container = document.getElementById('inner_container');
    // add the drag event
    container.addEventListener('click',clickDrag,false);
    container.addEventListener('mouseover',initCrosshairs,false);
    container.addEventListener('mouseout',removeCrosshairs,false);
    var containerStyle = "height:" + matrixHeight * cellsize + ";width:" + matrixWidth * cellsize+";";
    container.setAttribute('style',containerStyle);
    for ( var k=0; k<data.data.length; k++ ) {
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class','blue');
        newDiv.setAttribute('i', data.data[k].i);
        newDiv.setAttribute('j', data.data[k].j);
        newDiv.setAttribute('value', data.data[k].val);
        newDiv.addEventListener('mouseover', displayValue, false);
        var topPos = data.data[k].j * cellsize;
        var leftPos = data.data[k].i * cellsize;
        var style = "top:" + topPos + ";left:" + leftPos + ";";
        newDiv.setAttribute('style',style);
        container.appendChild(newDiv);
    }
    var divs = document.getElementsByTagName("div");
    for (var i=0, j=divs.length; i<j; i++ ) {
        var classname = divs[i].getAttribute("class");
        if ( validDivs[divs[i].getAttribute("class")] ) {
            divs[i].addEventListener('mouseover', displayValue, false);
        }
    }
}

function displayValue(event) {
    var valueDiv = document.getElementById("value");
    var str = "i = " + this.getAttribute("i") + ", j = " + this.getAttribute("j") + " => " + this.getAttribute("value");
    valueDiv.innerHTML = str;
}

function clickDrag(event) {
    
}

function initCrosshairs(event) {
    var target = event.target;
    var horDiv = document.createElement('div');
    horDiv.setAttribute("id","horDiv");
    var width = outW;
    horDiv.setAttribute("style","width:" + width +"px;");
    horDivProps.style = horDiv.getAttribute("style");
    var vertDiv = document.createElement('div');
    vertDiv.setAttribute("id","vertDiv");
    var height = outH;
    vertDiv.setAttribute("style","height:" + height +"px;");
    vertDivProps.style = vertDiv.getAttribute("style");
    var outer = document.getElementById('outer_container');
    outer.appendChild(horDiv)
    outer.appendChild(vertDiv);
    target.onmousemove = moveCrosshair;
}

function moveCrosshair(event) {
    var cursor = getCursorPosition(event);
    var testDiv = document.getElementById('test');
    var x = cursor.x - outLeft;
    var y = cursor.y - outTop;
    testDiv.innerHTML = "x: " + x + ", y: " + y;
    // move crosshair divs
    var horDiv = document.getElementById('horDiv');
    var vertDiv = document.getElementById('vertDiv');
    horDiv.setAttribute("style",horDivProps.style + "top:" + y + ";");
    vertDiv.setAttribute("style",vertDivProps.style + "left:" + x + ";");
}

function removeCrosshairs(event) {
    var target = event.target;
    target.mousemove = null;
    var outer = document.getElementById('outer_container');
    var horDiv = document.getElementById('horDiv');
    var vertDiv = document.getElementById('vertDiv');
    outer.removeChild(horDiv);
    outer.removeChild(vertDiv);
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
