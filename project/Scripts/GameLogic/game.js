
var canvas, ctx, ghostcanvas, gctx, WIDTH, HEIGHT, mySel, isClicked, offsetx, offsety,
    stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop, mx, my, 
    demo, seconds,  miliSeconds, timeBoard, scoreBoard, levelBoard, level_points, 
    counter, exitBtn, nextBtn, resumeBtn, pauseBtn, playAgainBtn, startBtn, infoBtn;


var pictures = [];
var level = 0;
var timeOver = false;
var points = 0;
var mySelColor = '#CC0000';
var mySelWidth = 2;
var isPaused = false;
var INTERVAL = 1;
var canvasValid = true;
var done = false;
var img_source = [];
var isDrag = false;


function Picture() {
    this.x = 0;
    this.y = 0;
    this.w = 1;
    this.h = 1;
    this.imgSource = "";
    this.originalX;
    this.originalY;
    this.onRightPosition;
    this.mixedX;
    this.mixedY;
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

    startBtn = document.getElementById('button-start');
    infoBtn = document.getElementById('button-info');
    exitBtn = document.getElementById('button-exit');
    pauseBtn = document.getElementById('button-pause');
    resumeBtn = document.getElementById('button-resume');
    nextBtn = document.getElementById('button-next');
    playAgainBtn = document.getElementById('button-play-again');

    startBtn.addEventListener('click', function () { btnClicked('start') }, false);
    infoBtn.addEventListener('click', function () { btnClicked('info') }, false);
    exitBtn.addEventListener('click', function () { btnClicked('exit') }, false);
    pauseBtn.addEventListener('click', function () { btnClicked('pause') }, false);
    resumeBtn.addEventListener('click', function () { btnClicked('resume') }, false);
    nextBtn.addEventListener('click', function () { btnClicked('next') }, false);
    playAgainBtn.addEventListener('click', function () { btnClicked('playAgain') }, false);
   
}

function btnClicked(btnName) {

    if (btnName === 'start') {

        var snd = new Audio("Content/sounds/in.mp3");
        snd.play();

        pauseBtn.style.display = 'block';
        exitBtn.style.display = 'block';
        startBtn.style.display = 'none';
        infoBtn.style.display = 'none';
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
    if (btnName === 'next') {

        pauseBtn.style.display = 'block';
        exitBtn.style.display = 'block';
        nextBtn.style.display = 'none';
        clearTimeout(counter);

        init();
        done = false;
    }
    if (btnName === 'playAgain') {

        pauseBtn.style.display = 'block';
        exitBtn.style.display = 'block';
        playAgainBtn.style.display = 'none';
        done = false;
        scoreBoard.innerHTML = '0';
        levelBoard.innerHTML = '0';
        timeOver = false;
        level = 0;
        clearTimeout(counter);
        init();
    }
}

function init() {

    level += 1;
    pauseBtn.style.display = 'none';
    exitBtn.style.display = 'none';
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
    getLevel(level);
}

function setLevelData(level) {

    var level_img_type;

    if (parseInt(level[0]) < 9) {


        level_img_type = level[0];
        level_points = parseInt(level[1]);
      

    } else {

        level_img_type = 8;
        level_points = 50;
   

    }
}

function setLevelImages(response) {

    img_source = response;

    if (img_source.length == 0) {

        alert("Failed to load image data please try again !")
        location.reload();

    } else {

        startGame();
    }

}

function startGame() {

    drawMemorizeScreen();

    setTimeout(function () {
        loadDemoImages();
        levelBoard.innerHTML = level;
    }, 1000);

    setTimeout(function () {
        var imageObj = new Image();
        imageObj.onload = function () {
            ctx.drawImage(imageObj, 0, 0);
        };
        imageObj.src = 'Content/images/letsplay.jpg';
        var snd = new Audio("Content/sounds/start.mp3");
        snd.play();


    }, 5000);

    setTimeout(function () {
        pauseBtn.style.display = 'block';
        exitBtn.style.display = 'block';
        loadMixedImages();

    }, 6000);

    setTime();

}


function drawMemorizeScreen() {

    var imageObj = new Image();
    imageObj.src = 'Content/images/memorizeit.jpg';

    imageObj.addEventListener("load", function () {
        ctx.drawImage(imageObj, 0, 0);
    }, false);
}

function loadDemoImages() {

    var newImgPosition;
    var tempX;
    var tempY;
    var margin = 10;

    newImgPosition = generateOriginalPosition();

    for (var i = 0; i < img_source.length; i++) {

        if (pictures.length == 0) {

            addPicture(newImgPosition.x + margin, newImgPosition.y + margin, 80, 80, img_source[i], newImgPosition.x + margin, newImgPosition.y + margin, 0, 0);

        } else {

            newImgPosition = generateOriginalPosition();
            tempX = newImgPosition.x;
            tempY = newImgPosition.y;

            for (var a = 0 ; a < pictures.length; a += 1) {

                if (pictures[a].originalX == (tempX + margin) && pictures[a].originalY == (tempY + margin)) {

                    a = -1;
                    newImgPosition = generateOriginalPosition();
                    tempX = newImgPosition.x;
                    tempY = newImgPosition.y;
                }
            }

            addPicture(tempX + margin, tempY + margin, 80, 80, img_source[i], tempX + margin, tempY + margin, 0, 0);
        }
    }

    demo = true;
}

function generateOriginalPosition() {

    var randomOriginalX = Math.floor((Math.random() * 3)) * 100;
    var randomOriginalY = Math.floor((Math.random() * 4)) * 100;

    var position = {

        x: randomOriginalX,
        y: randomOriginalY
    }

    return position;
}

function addPicture(x, y, w, h, imgSource, originalX, originalY, mixedX, mixedY) {

    var rect = new Picture();
    rect.x = x;
    rect.y = y;
    rect.w = w;
    rect.h = h;
    rect.imgSource = imgSource;
    rect.originalX = originalX;
    rect.originalY = originalY;
    rect.onRightPosition = false;
    rect.mixedX = mixedX;
    rect.mixedY = mixedY;
    pictures.push(rect);
    invalidate();
}

function loadMixedImages() {

    demo = false;
    clear(ctx);
    var margin = 10;
    var x = 300;
    var y = 0;

    for (var i = 0; i < pictures.length; i += 1) {

        pictures[i].mixedX = x + margin;
        pictures[i].mixedY = y + margin;
        pictures[i].x = x + margin;
        pictures[i].y = y + margin;

        if (x > 400) {
            y += 100;
            x = 300;

        } else {

            x += 100;
        }

    }

    invalidate();
    countTime();
}

function countTime() {

    counter = setInterval(function () {

        if (done == false && isPaused == false && timeOver == false) {
            updateTimeBoard();
        }
    }, 100);
}


function setTime() {
    miliSeconds = 0;

    switch (level) {
        case 1:
            seconds = 10;
            break;
        case 2:
            seconds = 15;
            break;
        case 3:
            seconds = 20;
            break
        case 4:
            seconds = 25;
            break
        case 5:
            seconds = 30;
            break
        case 6:
            seconds = 30;
            break
        case 7:
            seconds = 30;
            break
        case 8:
            seconds = 30;
            break
        default:
            seconds = 30;
    }
}

function check() {

    if (demo == false && isClicked == false) {

        var onRightPositionArray = [];
        var l = pictures.length;

        for (var i = l - 1; i >= 0; i--) {

            if ((pictures[i].x > pictures[i].originalX + 30 || pictures[i].x < pictures[i].originalX - 30) || (pictures[i].y > pictures[i].originalY + 30 || pictures[i].y < pictures[i].originalY - 30)) {

                pictures[i].x = pictures[i].mixedX;
                pictures[i].y = pictures[i].mixedY;
         
            }
            else {

                pictures[i].x = pictures[i].originalX;
                pictures[i].y = pictures[i].originalY;
                pictures[i].onRightPosition = true;
                onRightPositionArray.push(pictures[i]);     
            }
        }

        if (onRightPositionArray.length == l) {
            updateScoreBoard();
            done = true;
            timeBoard.innerHTML = '0 : 0';
            setTimeout(drawCompletedScreen, 200 );
            resumeBtn.style.display = 'none';
            nextBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
        }
    }
}

function animateRightPosition(picture) {

    picture.w = 40;
    picture.h = 40;
    picture.x += 20;
    picture.y += 20;

    setTimeout(function () {

        picture.w = 80;
        picture.h = 80;
        picture.x -= 20;
        picture.y -= 20;
        invalidate();

    }, 100);

}




function drawGameOverScreen() {

    pictures = [];
    var imageObj = new Image();

    imageObj.onload = function () {
        ctx.drawImage(imageObj, 0, 0);
    };

    imageObj.src = 'Content/images/gameover.jpg';
}

function drawCompletedScreen() {

    clear(ctx);
    var imageObj = new Image();
    var snd = new Audio("Content/sounds/compl.mp3");
    pictures = [];
    isDrag = false;

    imageObj.src = 'Content/images/level-complete.jpg';

    imageObj.onload = function () {
        ctx.drawImage(imageObj, 0, 0);
    };

    snd.play();
}

function draw() {

    if (canvasValid == false) {
        ctx.save();
        clear(ctx);

        var l = pictures.length;
        for (var i = 0; i < l; i++) {

            if (demo == true) {

                drawshape(ctx, pictures[i], pictures[i].imgSource);
            } else {

                var img = new Image();
                img.src = pictures[i].imgSource;

                ctx.drawImage(img, pictures[i].x, pictures[i].y, pictures[i].w, pictures[i].h);
            }
  
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
    }
}

function clear(c) {
    c.clearRect(0, 0, WIDTH, HEIGHT);
}


function drawshape(context, shape, imgSrc) {

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

    if (shape.x > WIDTH || shape.y > HEIGHT) return;
    if (shape.x + shape.w < 0 || shape.y + shape.h < 0) return;

    context.fillRect(shape.x, shape.y, shape.w, shape.h);
}

function drawFrame() {

    for (var i = 0; i < 400; i += 100) {

        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 400);
        ctx.stroke();

        if (i < 400) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(300, i);
            ctx.stroke();
        }
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

    offsetX += stylePaddingLeft;
    offsetY += stylePaddingTop;

    offsetX += styleBorderLeft;
    offsetY += styleBorderTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY

}

function myMove(e) {

    if (isDrag && timeOver == false) {

        getMouse(e);
        mySel.x = mx - offsetx;
        mySel.y = my - offsety;

        if (mySel.x < 0) {

            mySel.x = 0;
        }

        if (mySel.x > 520) {

            mySel.x = 520;
        }

        if (mySel.y < 0) {

            mySel.y = 0;
        }

        if (mySel.y > 320) {

            mySel.y = 320;
        }

        invalidate();
    }
}


function myDown(e) {
   
    isClicked = true;

    if (done == false && isPaused == false && timeOver ==false) {
        getMouse(e);
        var l = pictures.length;
        for (var i = l - 1; i >= 0; i--) {

            drawshapeRect(gctx, pictures[i], 'black');
            var imageData = gctx.getImageData(mx, my, 10, 10);

            var index = (mx + my * imageData.width) * 4;

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

        mySel = null;
        clear(gctx);
        invalidate();
    }
}

function myUp() {

    isClicked = false;

    if (done == false && timeOver == false && isPaused == false) {
        isDrag = false;
        canvas.onmousemove = null;
        check();
        if (mySel.onRightPosition == true) {

            var snd = new Audio("Content/sounds/correct.mp3");
            snd.play();
            animateRightPosition(mySel);
            seconds += 2;
        }

        if (mySel.onRightPosition == false) {

            var snd = new Audio("Content/sounds/wrong.mp3");
            snd.play();
            seconds -= 2;
        }

        mySel = null;
        invalidate();
    }
}

function invalidate() {
    canvasValid = false;
}

function updateTimeBoard() {

    if (miliSeconds < 1) {

        miliSeconds = 10;
        seconds -= 1;
    }
    else {

        miliSeconds -= 1;
    }

    timeBoard.innerHTML = seconds + ' : ' + miliSeconds;

    if (seconds == 0 && miliSeconds == 0) {

        gameOver();
        timeOver = true;
    }
};


function gameOver() {

    if (points != 0) {

        SaveScores(points);
    }

    pictures = [];
    mySel = null;
    points = 0;
    clear(ctx);
    drawGameOverScreen();
    pauseBtn.style.display = 'none';
    playAgainBtn.style.display = 'block';
    isDrag = false;

    var snd = new Audio("Content/sounds/gameOver.mp3");
    snd.play();

}

function updateScoreBoard() {

    points += level_points;


    scoreBoard.innerHTML = points;
    levelBoard.innerHTML = level;
}


function loadTimeBoard(nameTextBoxId) {

    var nameTextBoxElm = document.getElementById(nameTextBoxId);
    timeBoard = nameTextBoxElm;

}

function loadScoreBoard(nameTextBoxId) {

    var nameTextBoxElm = document.getElementById(nameTextBoxId);
    scoreBoard = nameTextBoxElm;

}

function loadLevel(nameTextBoxId) {


    var nameTextBoxElm = document.getElementById(nameTextBoxId);
    levelBoard = nameTextBoxElm;

}


window.onbeforeunload = function () {

    if (points !== 0) {
        SaveScores(points);

    }   
}