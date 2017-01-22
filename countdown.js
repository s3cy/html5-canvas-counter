WINDOW_WIDTH = 0;
WINDOW_HEIGHT= 0;

RADIUS = 0;
MARGIN_LEFT = 0;
MARGIN_TOP = 150;
END_TIME = new Date(2015, 5, 15, 1, 00, 00);

var curTimeSecond;
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
var balls = [];

window.onload = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    document.addEventListener("mousemove", mousemove, false);

    curTimeSecond = getCurrentTimeSecond();
    setInterval(function() {
        WINDOW_WIDTH = screen.width;
        WINDOW_HEIGHT = screen.height;
        RADIUS = WINDOW_WIDTH / 165;
        MARGIN_LEFT = WINDOW_WIDTH / 2 - 53.5 * (RADIUS + 1);

        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;
        render(context);
        update();
    }, 50);
}

function mousemove(e) {
    if (e.offsetX || e.layerX) {
        var x = e.offsetX == undefined ? e.layerX : e.offsetX;
        var y = e.offsetY == undefined ? e.layerY : e.offsetY;
        console.log (y);
    }
}

function update() {
    var nextTimeSecond = getCurrentTimeSecond();

    var nextHour = parseInt(nextTimeSecond / 3600);
    var nextMinute = parseInt((nextTimeSecond - nextHour * 3600) / 60);
    var nextSecond = parseInt(nextTimeSecond % 60);

    var curHour = parseInt(curTimeSecond / 3600);
    var curMinute = parseInt((curTimeSecond - nextHour * 3600) / 60);
    var curSecond = parseInt(curTimeSecond % 60);

    if (nextSecond != curSecond) {
        if (parseInt(nextHour / 10) != parseInt(curHour / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHour / 10));
        }
        if (parseInt(nextHour % 10) != parseInt(curHour % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHour % 10));
        }
        if (parseInt(nextMinute / 10) != parseInt(curMinute / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curHour / 10));
        }
        if (parseInt(nextMinute % 10) != parseInt(curMinute % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curHour % 10));
        }
        if (parseInt(nextSecond / 10) != parseInt(curSecond / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curHour / 10));
        }
        if (parseInt(nextSecond % 10) != parseInt(curSecond % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curHour % 10));
        }
        curTimeSecond = nextTimeSecond;
    }

    updateBall();
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var ball = {
                    x: x + 2 * j * (RADIUS + 1) + RADIUS + 1,
                    y: y + 2 * i * (RADIUS + 1) + RADIUS + 1,
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * RADIUS / 2,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(ball);
            }
        }
    }
}

function updateBall() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = - 0.7 * balls[i].vy;
        }
    }

    var count = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
            balls[count++] = balls[i];
    }

    while(balls.length > count) {
        balls.pop();
    }
}

function getCurrentTimeSecond() {
    var curTime = new Date();
    var result = END_TIME.getTime() - curTime.getTime();
    result = Math.round(result / 1000);
    return result >=0 ? result : 0;
}

function render(cxt) {
    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
    var hour = parseInt(curTimeSecond / 3600);
    var minute = parseInt((curTimeSecond - hour * 3600) / 60);
    var second = parseInt(curTimeSecond % 60);

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10), cxt);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(second / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(second % 10), cxt);

    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
    }
}

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0, 102, 135)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + 2 * j * (RADIUS + 1) + RADIUS + 1, y + 2 * i * (RADIUS + 1) + RADIUS + 1, RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
