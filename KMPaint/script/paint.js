var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var currTool = 'pen';
var down = false;
var currFontSize = '50px Arial';
var currStroke = 5;
var currColor = 'black';
var elemDrawing;
var drawings = [];
var redoArray = [];
var isFill = false;


canvas.onmousedown = function(e) {
    down = true;
    //console.log('click', e.clientX, this.offsetLeft);
    // The starting point of the drawing.
    x = e.clientX - this.offsetLeft;
    y = e.clientY - this.offsetTop;
    // I make elem drawing become an instance of the
    // tool that goes on the canvas.
    elemDrawing = findElem();
    elemDrawing.cord(x, y, true);

}

canvas.onmousemove = function(e) {

    if(down) {
        //console.log(this);
        mouseX = e.clientX - this.offsetLeft;
        mouseY = e.clientY - this.offsetTop;
        elemDrawing.cord(mouseX, mouseY, false);
        clearCanvas(false);
        drawCanvas();
        elemDrawing.draw();
    }
}

move = function(x,y,e) {
    console.log('sunna');

    if(down) {
        //console.log(this);
        mouseX = x;
        mouseY = y;
        //console.log(mouseX, mouseY, e.clientX, e.clientY);
        //elemDrawing.cord(mouseX, mouseY, false);
        clearCanvas(false);
        drawCanvas();
        elemDrawing.draw();
    }
}

canvas.onmouseup = function(e) {
    down = false;
    drawings.push(elemDrawing);
}

//A function that will return an instance of the current tool.
function findElem() {
    var element;
    console.log(currTool);
    switch(currTool) {
        case 'pen':
            element = new pen();
            element.setStrokeAndColor(currColor, currStroke);
            return element;
        case 'circle':
            element = new circle();
            element.isFilled(isFill);
            element.setStrokeAndColor(currColor, currStroke);
            return element;
        case 'rect':
            element = new rect();
            element.isFilled(isFill);
            element.setStrokeAndColor(currColor, currStroke);
            return element;
        case 'line':
            element = new line();
            element.setStrokeAndColor(currColor, currStroke);
            return element;
        case 'text':
            element = new text();
            element.setStrokeAndColor(currColor, currStroke);
            element.setFont(currFontSize);
            return element;
    }
}

function setFill() {
   if(isFill) {
        isFill = false;

   }
   else {
        isFill = true;
   }
}

function changeFontSize(size) {
    currFontSize = size+'px Arial';
}

function changeColor(color) {
    currColor = color;
    context.strokeStyle = currColor;
}

function changeTool(newTool) {
    currTool = newTool;
}


function clearCanvas(onClick) {
    // If the user wants to clear the canvas than the first part
    // of this if statement is executed. If we are clearing the canvas to resize
    // the tools than the second part is executed.
    if(onClick) {
        context.clearRect(0,0, canvas.width, canvas.height);
        drawings = [];
    }
    else {
        context.clearRect(0,0, canvas.width, canvas.height);
    }
}

function changePenSize(size) {
    currStroke = size;
    context.lineWidth = size;
}

function changeTool(tool) {
    console.log(tool, currTool);
    currTool = tool;    
}

function undo() {
    var tmp = drawings.pop();
    redoArray.push(tmp);
    clearCanvas();
    drawCanvas();
}

function redo() {
    try {
        redoArray[redoArray.length -1].draw();
        redoArray.pop();
        
    }
    catch(err) {
        throw 'Nothing to redo';
    }
}

// This function will draw all elements from the global array drawings.
function drawCanvas(e) {
    for(var i = 0; i < drawings.length; i++) {
        drawings[i].draw();
    }
}

//A function that downloads the sketch on the canvas.
function save() {
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    window.location.href=image; // it will save locally
}

