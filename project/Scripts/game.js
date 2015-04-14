
var done = false;
var canvas;
var ctx;
// holds all our pictures
var pictures = [];
var WIDTH;
var HEIGHT;
var INTERVAL = 2;  // how often, in milliseconds, we check to see if a redraw is needed
var isDrag = false;
var mx, my; // mouse coordinates
var demo;
var isClicked;
var W = 400; // Window's width
var H = 400; // Window's height
startBtn = {}; // Start button object
var x;
var y;
var w;
var h;
var seconds;
var miliSeconds;
var timeBoard;
mouse = {};
var canvasValid = false;
var mySel;
// The selection color and width. Right now we have a red selection with a small width
var mySelColor = '#CC0000';
var mySelWidth = 2;
// we use a fake canvas to draw individual shapes for selection testing
var ghostcanvas;
var gctx; // fake canvas context
// since we can drag from anywhere in a node
// instead of just its x/y corner, we need to save
// the offset of the mouse when we start dragging.
var offsetx, offsety;
// Padding and border style widths for mouse offsets
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
// initialize our canvas, add a ghost canvas, set draw loop
// then add everything we want to intially exist on the canvas

canvas = document.getElementById('canvas');
HEIGHT = canvas.height;
WIDTH = canvas.width;
ctx = canvas.getContext('2d');
ghostcanvas = document.createElement('canvas');
ghostcanvas.height = HEIGHT;
ghostcanvas.width = WIDTH;
gctx = ghostcanvas.getContext('2d');
canvas.addEventListener("mousemove", trackPosition, true);
canvas.addEventListener("mousedown", btnClick, true);

startBtn = {
    w: 100,
    h: 50,
    x: W / 2 - 50,
    y: H / 2 - 25,
    draw: function () {
        console.log("tuka");
        ctx.strokeStyle = "black";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStlye = "black";
        ctx.fillText("Start", W / 2, H / 2);
    }

};

function loadTimeBoard(nameTextBoxId) {
    var nameTextBoxElm = document.getElementById(nameTextBoxId);
    timeBoard = nameTextBoxElm;

}

// Track the position of mouse cursor
function trackPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

function Picture() {
    this.x = 0;
    this.y = 0;
    this.w = 1; // default width and height?
    this.h = 1;
    this.imgSource = "";
    this.originalX;
    this.originalY;
    this.onRightPosition;
}

//Initialize a new Box, add it, and invalidate the canvas
function addPicture(x, y, w, h, imgSource, originalX, originalY) {

    var rect = new Picture();
    rect.x = x;
    rect.y = y;
    rect.w = w;
    rect.h = h;
    rect.imgSource = imgSource;
    rect.originalX = originalX;
    rect.originalY = originalY;
    rect.onRightPosition = false;
    pictures.push(rect);
    invalidate();
}

function init() {

    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.onselectstart = function () { return false; }

    // fixes mouse co-ordinate problems when there's a border or padding
    // see getMouse for more detail
    if (document.defaultView && document.defaultView.getComputedStyle) {
        stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
        stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
        styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
        styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
    }

    // make draw() fire every INTERVAL milliseconds
    setInterval(draw, INTERVAL);

    // set our events. Up and down are for dragging,
    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;

    // add custom initialization here:

    // add an orange rectangle

    addPicture(0, 0, 80, 80, 'Content/images/5108.jpg', 0, 0);

    addPicture(100, 100, 80, 80, 'Content/images/11.jpg', 100, 100);

    addPicture(200, 0, 80, 80, 'Content/images/12.jpg', 200, 0);
    addPicture(200, 200, 80, 80, 'Content/images/13.jpg', 200, 200);

    demo = true;

    setTimeout(function () {
        clear(ctx);
        ctx.fillStyle = "blue";
        ctx.font = "bold 16px Arial";
        ctx.fillText("Start", 100, 100);

    }, 2000);




    setTimeout(function () {

        demo = false;
        clear(ctx);
        pictures = [];

        addPicture(310, 0, 80, 80, 'Content/images/5108.jpg', 0, 0);

        addPicture(310, 100, 80, 80, 'Content/images/11.jpg', 100, 100);

        addPicture(310, 200, 80, 80, 'Content/images/12.jpg', 200, 0);
        addPicture(310, 300, 80, 80, 'Content/images/13.jpg', 200, 200);

    }, 3000);

    seconds = 0;
    miliSeconds = 0;

    countTime();


}


function countTime() {

    setInterval(function () {

        if (done == false) {
            updateTimeBoard();
        }
    }, 10);
}


function drawFrame() {

    ctx.beginPath(); // Start the path
    ctx.moveTo(100, 0); // Set the path origin
    ctx.lineTo(100, 400); // Set the path destination
    ctx.stroke(); // Outline the path
    ctx.beginPath(); // Start the path
    ctx.moveTo(200, 0); // Set the path origin
    ctx.lineTo(200, 400); // Set the path destination
    ctx.stroke(); // Outline the path
    ctx.beginPath(); // Start the path
    ctx.moveTo(300, 0); // Set the path origin
    ctx.lineTo(300, 400); // Set the path destination
    ctx.stroke(); // Outline the path
    ctx.beginPath(); // Start the path
    ctx.moveTo(0, 100); // Set the path origin
    ctx.lineTo(300, 100); // Set the path destination
    ctx.stroke(); // Outline the path
    ctx.beginPath(); // Start the path
    ctx.moveTo(0, 200); // Set the path origin
    ctx.lineTo(300, 200); // Set the path destination
    ctx.stroke(); // Outline the path
    ctx.beginPath(); // Start the path
    ctx.moveTo(0, 300); // Set the path origin
    ctx.lineTo(300, 300); // Set the path destination
    ctx.stroke(); // Outline the path

}
//wipes the canvas context
function clear(c) {
    c.clearRect(0, 0, WIDTH, HEIGHT);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
function draw() {
    if (canvasValid == false) {
        ctx.save();
        clear(ctx);
        // Add stuff you want drawn in the background all the time here

        // draw all boxes
        var l = pictures.length;
        for (var i = 0; i < l; i++) {
            drawshape(ctx, pictures[i], pictures[i].imgSource);
            drawFrame();
        }

        // draw selection
        // right now this is just a stroke along the edge of the selected box
        if (mySel != null) {
            ctx.strokeStyle = mySelColor;
            ctx.lineWidth = mySelWidth;
            ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
        }

        // Add stuff you want drawn on top all the time here

        ctx.restore();
        canvasValid = true;

    }
}

// Draws a single shape to a single context
// draw() will call this with the normal canvas
// myDown will call this with the ghost canvas
function drawshape(context, shape, imgSrc) {


    // We can skip the drawing of elements that have moved off the screen:
    if (shape.x > WIDTH || shape.y > HEIGHT) return;
    if (shape.x + shape.w < 0 || shape.y + shape.h < 0) return;

    var img = new Image();
    img.src = imgSrc;



    img.onload = function () {

        context.drawImage(img, shape.x, shape.y, shape.w, shape.h);
    };


}


function drawshapeRect(context, shape, fill) {
    context.fillStyle = fill;

    // We can skip the drawing of elements that have moved off the screen:
    if (shape.x > WIDTH || shape.y > HEIGHT) return;
    if (shape.x + shape.w < 0 || shape.y + shape.h < 0) return;

    context.fillRect(shape.x, shape.y, shape.w, shape.h);
}




// Happens when the mouse is moving inside the canvas
function myMove(e) {
    if (isDrag) {

        getMouse(e);
        mySel.x = mx - offsetx;
        mySel.y = my - offsety;

        // something is changing position so we better invalidate the canvas!
        invalidate();
    }

}

// Happens when the mouse is clicked in the canvas
function myDown(e) {

    isClicked = true;
    if (done == false) {
        getMouse(e);
        clear(gctx);
        var l = pictures.length;
        for (var i = l - 1; i >= 0; i--) {
            // draw shape onto ghost context
            drawshapeRect(gctx, pictures[i], 'black');

            // get image data at the mouse x,y pixel
            var imageData = gctx.getImageData(mx, my, 10, 10);


            //print info
            //console.log(imageData);

            var index = (mx + my * imageData.width) * 4;
            // if the mouse pixel exists, select and break
            if (imageData.data[3] > 0) {
                if ((pictures[i].x > pictures[i].originalX + 20 || pictures[i].x < pictures[i].originalX - 20) || (pictures[i].y > pictures[i].originalY + 20 || pictures[i].y < pictures[i].originalY - 20)) {
                    mySel = pictures[i];
                    offsetx = mx - mySel.x;
                    offsety = my - mySel.y;
                    mySel.x = mx - offsetx;
                    mySel.y = my - offsety;
                    isDrag = true;
                    canvas.onmousemove = myMove;
                    invalidate();
                    clear(gctx);
                    return;


                }
            }
        }
        // havent returned means we have selected nothing
        mySel = null;
        // clear the ghost canvas for next time
        clear(gctx);
        // invalidate because we might need the selection border to disappear
        invalidate();
    }
}

function myUp() {
    isClicked = false;
    if (done == false) {
        isDrag = false;
        canvas.onmousemove = null;
        mySel = null;
        invalidate();
    }

}


function invalidate() {
    canvasValid = false;
}

// Sets mx,my to the mouse position relative to the canvas
// unfortunately this can be tricky, we have to worry about padding and borders
function getMouse(e) {
    var element = canvas, offsetX = 0, offsetY = 0;

    if (element.offsetParent) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    offsetX += stylePaddingLeft;
    offsetY += stylePaddingTop;

    offsetX += styleBorderLeft;
    offsetY += styleBorderTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY


}

function check() {

    if (demo == false && isClicked == false) {

        var onRightPositionArray = [];
        var l = pictures.length;

        for (var i = l - 1; i >= 0; i--) {

            if ((pictures[i].x > pictures[i].originalX + 20 || pictures[i].x < pictures[i].originalX - 20) || (pictures[i].y > pictures[i].originalY + 20 || pictures[i].y < pictures[i].originalY - 20)) {
            } else {

                pictures[i].onRightPosition = true;
                onRightPositionArray.push(pictures[i]);

            }

            console.log(pictures[i].onRightPosition);

        }


        console.log(pictures.length);
        console.log(onRightPositionArray.length);

        if (onRightPositionArray.length == l) {

            clear(ctx);
            done = true;

            ctx.fillStyle = "blue";
            ctx.font = "bold 16px Arial";
            ctx.fillText("DONE", 100, 100);
        }

    }
}

window.setInterval(function () {
    check();
}, 1000);


function btnClick(e) {


    // Variables for storing mouse position on click
    var mx = e.pageX,
            my = e.pageY;

    // Click start button
    if (mx >= startBtn.x && mx <= startBtn.x + startBtn.w) {

        // Delete the start button after clicking it
        startBtn = {};
    }

    if (startBtn.x !== undefined) {
        console.log("kur");
        startBtn = {};
        init()

    }

}

function updateTimeBoard() {

    if (miliSeconds > 100) {

        miliSeconds = 0;
        seconds += 1;
    }
    else {

        miliSeconds += 1;
    }

    timeBoard.innerHTML = "Time : " + seconds + ' : ' + miliSeconds;
};


