var validDivs = new Object();
validDivs['blue'] = true;
validDivs['white'] = true;

function load() {
    var container = document.getElementById('container');
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
