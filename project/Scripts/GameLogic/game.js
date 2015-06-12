
var canvas, ctx, ghostcanvas, gctx, WIDTH, HEIGHT, mySel, isClicked, offsetx, offsety,
    stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop, mx, my,
    demo, seconds, miliSeconds, timeBoard, scoreBoard,
    counter, levelObject;

var pictures = [];
var timeOver = false;
var points = 0;
var isPaused = false;
var INTERVAL = 10;
var buttons;
var canvasValid = true;
var done = false;
var isDrag = false;



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
    buttons = new Button();
    buttons.setButtons();

}

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

function init() {


    buttons.pauseBtn.style.display = 'none';
    buttons.exitBtn.style.display = 'none';
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

    levelObject = new Level(parseInt(levelLbl.innerHTML) + 1);
    levelObject.getLevel();



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
            ctx.strokeStyle = '#CC0000';
            ctx.lineWidth = 2;
            ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
        }

        ctx.restore();
        canvasValid = true;
    }
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

function drawStartScreen() {

    var imageObj = new Image();
    imageObj.onload = function () {
        ctx.drawImage(imageObj, 0, 0);
    };
    imageObj.src = 'Content/images/canvas-background.jpg';
}

function drawMemorizeScreen() {

    var imageObj = new Image();
    imageObj.src = 'Content/images/memorizeit.jpg';

    imageObj.addEventListener("load", function () {
        ctx.drawImage(imageObj, 0, 0);
    }, false);
}

function startGame() {

    drawMemorizeScreen();

    setTimeout(function () {
        var lvl = levelObject.levelNumber;
        loadDemoImages();
        levelLbl.innerHTML = lvl;
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
        buttons.pauseBtn.style.display = 'block';
        buttons.exitBtn.style.display = 'block';
        loadMixedImages();

    }, 6000);

    setTime();

}

function loadDemoImages() {

    var newImgPosition;
    var tempX;
    var tempY;
    var margin = 10;
    newImgPosition = generatePosition();

    for (var i = 0; i < levelObject.img_source.length; i++) {

        if (pictures.length == 0) {

            addPicture(newImgPosition.x + margin, newImgPosition.y + margin, 80, 80,
                levelObject.img_source[i], newImgPosition.x + margin, newImgPosition.y + margin, 0, 0);
        } else {
            newImgPosition = generatePosition();
            tempX = newImgPosition.x;
            tempY = newImgPosition.y;

            for (var a = 0 ; a < pictures.length; a += 1) {

                if (pictures[a].originalX == (tempX + margin) && pictures[a].originalY == (tempY + margin)) {
                    a = -1;
                    newImgPosition = generatePosition();
                    tempX = newImgPosition.x;
                    tempY = newImgPosition.y;
                }
            }
            addPicture(tempX + margin, tempY + margin, 80, 80, levelObject.img_source[i], tempX + margin, tempY + margin, 0, 0);
        }
    }
    demo = true;
}

function generatePosition() {

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

function invalidate() {
    canvasValid = false;
}

function setTime() {
    miliSeconds = 0;

    switch (levelObject.levelNumber) {
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

function countTime() {

    counter = setInterval(function () {

        if (done == false && isPaused == false && timeOver == false) {
            updateTimeBoard();
        }
    }, 100);
}

function check() {

    if (demo == false && isClicked == false) {

        var onRightPositionArray = [];
        var l = pictures.length;

        for (var i = l - 1; i >= 0; i--) {

            if ((pictures[i].x > pictures[i].originalX + 30 || pictures[i].x < pictures[i].originalX - 30) ||
                (pictures[i].y > pictures[i].originalY + 30 || pictures[i].y < pictures[i].originalY - 30)) {

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
            setTimeout(drawCompletedScreen, 200);
            buttons.resumeBtn.style.display = 'none';
            buttons.nextBtn.style.display = 'block';
            buttons.pauseBtn.style.display = 'none';
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

function clear(c) {
    c.clearRect(0, 0, WIDTH, HEIGHT);
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

    if (done == false && isPaused == false && timeOver == false) {
        getMouse(e);
        var l = pictures.length;
        for (var i = l - 1; i >= 0; i--) {

            drawshapeRect(gctx, pictures[i], 'black');
            var imageData = gctx.getImageData(mx, my, 10, 10);

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

var Level = (function () {

    function Level(levelNumber) {

        this.levelNumber = levelNumber;
        this.level_points = "";
        this.img_source = [];
    }

    Level.prototype = {

        setLevelImages: function (response) {

            this.img_source = response;


            if (this.img_source.length == 0) {

                alert("Failed to load image data please try again !")
                location.reload();

            } else {

                startGame();
            }

        },
        getLevel: function () {
            var that = this;
            var data = "{id :" + this.levelNumber + "}";

            $.ajax({
                type: "POST",
                url: "Default.aspx/GetLevel",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var level_img_type;

                    if (parseInt(response.d[0]) < 9) {

                        level_img_type = response.d[0];
                        that.level_points = parseInt(response.d[1]);

                    } else {

                        level_img_type = 8;
                        that.level_points = 50;
                    }
                    that.getLevelImages(response.d[0]);

                },
                failure: function (response) {
                    alert("Error in loading images, Please try again!");
                }
            });

        },
        getLevelImages: function (levelLbl) {

            var that = this;
            var data = "{imgTypeId :" + levelLbl + "}";
            $.ajax({
                type: "POST",
                url: "Default.aspx/GetImage",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    that.setLevelImages(response.d);
                },
                failure: function (response) {
                    alert("Error in loading images, Please try again!");
                }
            });
        }
    };

    return Level;

}());

var Button = (function () {

    function Button() {

        this.startBtn = document.getElementById('button-start');
        console.log(document.getElementById('button-start'));
        this.infoBtn = document.getElementById('button-info');
        this.exitBtn = document.getElementById('button-exit');
        this.pauseBtn = document.getElementById('button-pause');
        this.resumeBtn = document.getElementById('button-resume');
        this.nextBtn = document.getElementById('button-next');
        this.playAgainBtn = document.getElementById('button-play-again');

    }
    Button.prototype.setButtons = function () {

        console.log(this.startBtn);

        this.startBtn.addEventListener('click', function () { btnClicked('start') }, false);
        this.infoBtn.addEventListener('click', function () { btnClicked('info') }, false);
        this.exitBtn.addEventListener('click', function () { btnClicked('exit') }, false);
        this.pauseBtn.addEventListener('click', function () { btnClicked('pause') }, false);
        this.resumeBtn.addEventListener('click', function () { btnClicked('resume') }, false);
        this.nextBtn.addEventListener('click', function () { btnClicked('next') }, false);
        this.playAgainBtn.addEventListener('click', function () { btnClicked('playAgain') }, false);

    }

    function btnClicked(btnName) {



        if (btnName === 'start') {

            var snd = new Audio("Content/sounds/in.mp3");
            snd.play();

            buttons.pauseBtn.style.display = 'block';
            buttons.exitBtn.style.display = 'block';
            buttons.startBtn.style.display = 'none';
            buttons.infoBtn.style.display = 'none';
            init();
        }
        if (btnName === 'pause') {

            buttons.pauseBtn.style.display = 'none';
            buttons.resumeBtn.style.display = 'block';
            isPaused = true;
        }
        if (btnName === 'resume') {

            buttons.pauseBtn.style.display = 'block';
            buttons.resumeBtn.style.display = 'none';
            isPaused = false;
        }
        if (btnName === 'exit') {

            location.reload();
        }
        if (btnName === 'next') {

            buttons.pauseBtn.style.display = 'block';
            buttons.exitBtn.style.display = 'block';
            buttons.nextBtn.style.display = 'none';
            clearTimeout(counter);

            init();
            done = false;
        }
        if (btnName === 'playAgain') {

            buttons.pauseBtn.style.display = 'block';
            buttons.exitBtn.style.display = 'block';
            buttons.playAgainBtn.style.display = 'none';
            done = false;
            scoreBoard.innerHTML = '0';
            levelLbl.innerHTML = '0';
            timeOver = false;

            clearTimeout(counter);
            init();
        }
    }


    return Button;



}());

function updateTimeBoard() {

    if (miliSeconds < 1) {

        miliSeconds = 10;
        seconds -= 1;
    }
    else {

        miliSeconds -= 1;
    }

    timeBoard.innerHTML = seconds + ' : ' + miliSeconds;

    if (seconds <= 0 && miliSeconds <= 0) {
        timeBoard.innerHTML = '0 : 0';

        gameOver();
        timeOver = true;
    }
};

function loadTimeBoard(nameTextBoxId) {

    var nameTextBoxElm = document.getElementById(nameTextBoxId);
    timeBoard = nameTextBoxElm;

}

function gameOver() {

    if (points != 0) {

        SaveScores(points);
    }

    pictures = [];
    mySel = null;
    points = 0;
    clear(ctx);
    drawGameOverScreen();
    buttons.pauseBtn.style.display = 'none';
    buttons.playAgainBtn.style.display = 'block';
    isDrag = false;

    var snd = new Audio("Content/sounds/gameOver.mp3");
    snd.play();

}

function updateScoreBoard() {
    console.log('lvl');
    console.log(levelObject.levelNumber);

    points += levelObject.level_points + seconds;
    console.log('seconds' + seconds);

    scoreBoard.innerHTML = points;

    levelLbl.innerHTML = levelObject.levelNumber;
}

function loadScoreBoard(nameTextBoxId) {

    var nameTextBoxElm = document.getElementById(nameTextBoxId);
    scoreBoard = nameTextBoxElm;

}

function SaveScores(scoreLabel) {


    $.ajax({
        type: "POST",
        async: false,
        url: "Default.aspx/SaveScores",
        data: JSON.stringify({ score: scoreLabel }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        failure: function (response) {
            alert("Error in saving results!");
        }
    });
}

window.onbeforeunload = function () {

    if (points !== 0) {
        SaveScores(points);

    }
}
