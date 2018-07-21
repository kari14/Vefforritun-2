// Constructor for the elements
function elem(type, x1, y1, x2, y2, color, stroke) {
    // The type of shape.
    this.type = type;
    // The coordinates for the begin point. 
    // of the drawing.
    this.x1 = x1;
    this.y1 = y1;
    // The coordinates for the mouse point.
    this.x2 = x2;
    this.y2 = y2;
}

// A prototype function that initializes the cords.
elem.prototype.cord = function(x, y, begin) {
    // Sets the begining point.
    if(begin) {
        this.x1 = x;
        this.y1 = y;
    }
    // Sets the mouse points.
    else {
        this.x2 = x;
        this.y2 = y;
    }
}

// One amazingly large drawing function.
elem.prototype.draw = function() {
    switch(this.type) {
        case 'circle':
            var radius = Math.abs(this.x2 - this.x1);
            context.beginPath();
            //A bad way to get a filled circle.
            if(this.fill) {
                context.arc(this.x1, this.y1, radius, 0, Math.PI * 2);
                context.fillStyle = this.color;
                context.fill();
            }
            else {
                context.lineWidth = this.stroke;
                context.arc(this.x1, this.y1, radius, 0, Math.PI * 2);
                context.strokeStyle = this.color;
                context.stroke();
            }
            break;
        case 'rect':
            var height = this.y2 - this.y1;
            var width = this.x2 - this.x1;
            context.beginPath();
            if(this.fill) {
                context.fillStyle = this.color;
                context.fillRect(this.x1, this.y1, width, height);
                context.fill();
            }
            else {
                context.lineWidth = this.stroke;
                context.strokeStyle = this.color;
                context.rect(this.x1, this.y1, width, height);
                context.stroke();
            }
            break;
        case 'line':
            context.beginPath();
            context.moveTo(this.x1, this.y1);
            context.lineTo(this.x2, this.y2);
            context.strokeStyle = this.color;
            context.lineWidth = this.stroke;
            context.stroke();
            break;
        case 'text':
            var text = document.getElementById('inputText').value;
            context.fillText(text, this.x1, this.y1);
            context.fillStyle = this.color;
            context.font = this.font;
            break;
        case 'pen':
            context.beginPath();
            context.moveTo(this.Xs[i], this.Ys[i]);
            for(var i = 1; i < this.Xs.length; i++) {
                    context.lineTo(this.Xs[i], this.Ys[i]);
            }
            context.strokeStyle = this.color;
            context.lineWidth = this.stroke;
            context.stroke();
            break;
    }
}

//sets the fill element for circle and rect.
elem.prototype.isFilled = function(filled) {
    if(filled) {
        this.fill = true;
    }
    else {
        this.fill = false;
    }
}

elem.prototype.setStrokeAndColor = function(color, stroke) {
    this.color = color;
    this.stroke = stroke;
}

elem.prototype.setFont = function(font) {
    this.font = font; 
}

function pen() {
    this.type = 'pen';
    // I will make two arrays that
    // stores the x and y cords that
    // the mouse whent over.
    this.Xs = [];
    this.Ys = [];
}

function circle() {
    this.type = 'circle';
}

function rect() {
    this.type = 'rect';
}

function line() {
    this.type = 'line';
}

function text() {
    this.type = 'text';
}

pen.prototype = new elem();
circle.prototype = new elem();
rect.prototype = new elem();
line.prototype = new elem();
text.prototype = new elem();

//Function that fills the arrays of X and Y coordinates.
pen.prototype.cord = function(x1, y1) {
    this.Xs.push(x1);
    this.Ys.push(y1);
}
