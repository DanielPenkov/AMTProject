
var canvas;
var ctx;
var ghostcanvas;
var gctx; // fake canvas context
var WIDTH; //Canvas Width
var HEIGHT; // Canvas Height
var isPaused = false;
var INTERVAL = 1;  // how often, in milliseconds, we check to see if a redraw is needed
var canvasValid = false;
var pictures = [];
var mySel;
var mySelColor = '#CC0000';
var mySelWidth = 2;
var isClicked;
var done = false;
var offsetx, offsety;
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
var img_source;
var isDrag = false;
var mx, my; // mouse coordinates
var demo;
var points = 0;
var seconds;
var miliSeconds;
var timeBoard;
var scoreBoard;
var level;
level = 1;



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




function loadCanvas() {

    canvas = document.getElementById('canvas');
    HEIGHT = canvas.height;
    WIDTH = canvas.width;
    ctx = canvas.getContext('2d');
    ghostcanvas = document.createElement('canvas');
    ghostcanvas.height = HEIGHT;
    ghostcanvas.width = WIDTH;
    gctx = ghostcanvas.getContext('2d');
    console.log("Canvasa se zaredi");
    drawStartScreen();
    manageButtons();
}

function drawStartScreen() {

    var imageObj = new Image();
    imageObj.onload = function () {
        ctx.drawImage(imageObj, 0, 0);
    };
    imageObj.src = 'Content/images/canvas-background.jpg';
}


function manageButtons() {
    console.log('vliza v btnMngr');

    var startBtn = document.getElementById('button-start');
    var levelBtn = document.getElementById('button-level');
    var infoBtn = document.getElementById('button-info');
    var exitBtn = document.getElementById('button-exit');
    var pauseBtn = document.getElementById('button-pause');
    var resumeBtn = document.getElementById('button-resume');

    startBtn.addEventListener('click', function () { btnClicked('start') }, false);
    levelBtn.addEventListener('click', function () { btnClicked('level') }, false);
    infoBtn.addEventListener('click', function () { btnClicked('info') }, false);
    exitBtn.addEventListener('click', function () { btnClicked('exit') }, false);
    pauseBtn.addEventListener('click', function () { btnClicked('pause') }, false);
    resumeBtn.addEventListener('click', function () { btnClicked('resume') }, false);

    function btnClicked(btnName) {

        if (btnName === 'start') {

            pauseBtn.style.display = 'block';
            exitBtn.style.display = 'block';
            startBtn.style.display = 'none';
            levelBtn.style.display = 'none';
            infoBtn.style.display = 'none';
            resumeBtn.style.display = 'none';
            init();
        }
        if (btnName === 'pause') {

            pauseBtn.style.display = 'none';

            resumeBtn.style.display = 'block';
            isPaused = true;
        }
        if (btnName === 'resume') {

            pauseBtn.style.display = 'block';
            resumeBtn.style.display = 'none';
            isPaused = false;
        }
        if (btnName === 'exit') {

            location.reload();
        }
    }
}


function chooseLevel() {

    document.getElementById('button-level').addEventListener('click', showLevels, false);

    function showLevels() {
        document.getElementById('levelList').style.display = 'block';
    }
}


function countTime() {

    setInterval(function () {

        if (done == false && isPaused == false) {
            updateTimeBoard();
        }
    }, 100);
}

function init() {

 
    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.onselectstart = function () { return false; }

    if (document.defaultView && document.defaultView.getComputedStyle) {
        stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
        stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
        styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
        styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
    }

    setInterval(draw, INTERVAL);

    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;

    // To be renamed  - AJAX
    GetImage();
    drawLoadScreen();
    setTimeout(function () {
        // to put logic about level loading here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log("purvi time out - kude trqbva da sa !");
        addPicture(10, 10, 80, 80, img_source[0], 10, 10);

        addPicture(110, 110, 80, 80, img_source[1], 110, 110);

        addPicture(210, 10, 80, 80, img_source[2], 210, 10);
        addPicture(210, 210, 80, 80, img_source[3], 210, 210);

        demo = true;

    }, 1000);



    setTimeout(function () {
        var imageObj = new Image();
        imageObj.onload = function () {
            ctx.drawImage(imageObj, 0, 0);
        };
        imageObj.src = 'Content/images/letsplay.jpg';

    }, 3000);




    setTimeout(function () {
        console.log("treti time out - pochva !");

        demo = false;
        clear(ctx);
        pictures = [];
        /////////////////////////////Set logic for ordering the imges - left!!!!!!!!!!!!!

        addPicture(310, 0, 80, 80, img_source[0], 10, 10);

        addPicture(310, 100, 80, 80, img_source[1], 110, 110);

        addPicture(310, 200, 80, 80, img_source[2], 210, 10);
        addPicture(310, 300, 80, 80, img_source[3], 210, 210);
        countTime();

    }, 4000);

    seconds = 0;
    miliSeconds = 0;
}



function check() {

    if (demo == false && isClicked == false) {

        var onRightPositionArray = [];
        var l = pictures.length;

        for (var i = l - 1; i >= 0; i--) {

            if ((pictures[i].x > pictures[i].originalX + 20 || pictures[i].x < pictures[i].originalX - 20) || (pictures[i].y > pictures[i].originalY + 20 || pictures[i].y < pictures[i].originalY - 20)) {


            }
            else {
                console.log("picture x " + pictures[i].x + "picture y " + pictures[i].y);
                console.log("picture original x " + pictures[i].originalX + "picture original y " + pictures[i].originalY);
             
                pictures[i].x = pictures[i].originalX;
                pictures[i].y = pictures[i].originalY;

                pictures[i].onRightPosition = true;
                onRightPositionArray.push(pictures[i]);
            }
        }


        if (onRightPositionArray.length == l) {

            clear(ctx);
            done = true;
            SaveScores();

        }

    }
}

//window.setInterval(function () {

//    if (done == false) {
//        check();
//    }

//}, 1000);


function drawLoadScreen() {

    var imageObj = new Image();
    imageObj.src = 'Content/images/loading.jpg';

    imageObj.addEventListener("load", function () {
        ctx.drawImage(imageObj, 0, 0);
    }, false);
}

function draw() {
    if (canvasValid == false) {
        ctx.save();
        clear(ctx);

        var l = pictures.length;
        for (var i = 0; i < l; i++) {
            drawshape(ctx, pictures[i], pictures[i].imgSource);
            drawFrame();
        }

        // stroke along the edge of the selected box
        if (mySel != null) {
            ctx.strokeStyle = mySelColor;
            ctx.lineWidth = mySelWidth;
            ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
        }

        ctx.restore();
        canvasValid = true;
        window.requestAnimationFrame(draw);
    }
}

function clear(c) {
    c.clearRect(0, 0, WIDTH, HEIGHT);
}


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

function drawFrame() {

    ctx.beginPath(); 
    ctx.moveTo(100, 0); 
    ctx.lineTo(100, 400); 
    ctx.stroke(); 
    ctx.beginPath(); 
    ctx.moveTo(200, 0); 
    ctx.lineTo(200, 400); 
    ctx.stroke(); 
    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400); 
    ctx.stroke(); 
    ctx.beginPath(); 
    ctx.moveTo(0, 100); 
    ctx.lineTo(300, 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.lineTo(300, 200);
    ctx.stroke();
    ctx.beginPath(); 
    ctx.moveTo(0, 300); 
    ctx.lineTo(300, 300);
    ctx.stroke();

}

// To be renamed  - AJAX
function setImg(response) {

    img_source = response;

}

function myDown(e) {

    console.log('natisna mishkata');
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
            console.log(imageData);

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
    console.log('Vzema mishkata na X: ' + mx + " my : " + my);
}

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

function loadTimeBoard(nameTextBoxId) {
    var nameTextBoxElm = document.getElementById(nameTextBoxId);
    timeBoard = nameTextBoxElm;

}


function loadScoreBoard(nameTextBoxId) {

    var nameTextBoxElm = document.getElementById(nameTextBoxId);
    scoreBoard = nameTextBoxElm;

}

function myMove(e) {
    if (isDrag) {
        console.log("Drag");

        getMouse(e);
        mySel.x = mx - offsetx;
        mySel.y = my - offsety;

        // something is changing position so we better invalidate the canvas!
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
        check();
    }

}

function invalidate() {
    canvasValid = false;
}


function updateTimeBoard() {

    if (miliSeconds > 10) {

        miliSeconds = 0;
        seconds += 1;
    }
    else {

        miliSeconds += 1;
    }

    timeBoard.innerHTML = seconds + ' : ' + miliSeconds;
};

function updateScoreBoard() {

    if (level === 1) {

        points += 10;
        level += 1;
        console.log("vliza v 1");
    }

    else if (level === 2) {
        points += 15;
        level += 1;
        console.log("vliza v 2");
    }

    else if (level === 3) {
        points += 20;
        level += 1;
        console.log("vliza v 3");
    }

    scoreBoard.innerHTML = points;
};

