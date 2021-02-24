const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Ball {
    constructor(point, velocity, color, size) {
        this.x = point.x;
        this.y = point.y;
        this.vx = velocity.vx;
        this.vy = velocity.vy;
        this.color = color;
        this.size = size;
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }
}

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.vx = -this.vx;
    }
    if ((this.x - this.size) <= 0) {
        this.vx = -this.vx;
    }
    if ((this.y + this.size) >= height) {
        this.vy = -this.vy;
    }
    if ((this.y - this.size) <= 0) {
        this.vy = -this.vy;
    }
    
    this.x += this.vx;
    this.y += this.vy;
};


Ball.prototype.detectCollision = function (others) {
    others.forEach((other) => {
        if (this !== other) {
            const distance = Math.sqrt(
                Math.pow(this.x - other.x, 2)
                + Math.pow(this.y - other.y, 2)
            );
            if (distance < this.size + other.size) {
                this.vx = -this.vx;
                this.vy = -this.vy;
                other.vx = -other.vx;
                other.vy = -other.vy;
            }
        }
    });
};


let balls = [];

function createBall() {
    let size = random(10, 20);
    let ball = new Ball(
        {
            x: random(0 + size, width - size),
            y: random(0 + size, height - size),
        },
        {
            vx: random(-10, 10),
            vy: random(-10, 10),
        },
        'rgb(' + random(0, 255) + ', '
            + random(0, 255) + ', ' + random(0, 255) +')',
        size,
    );
    return ball;
}

function loop() {
    context.fillStyle = 'rgba(0, 0, 0, 0.25)';
    context.fillRect(0, 0, width, height);

    balls.forEach((ball) => {
        ball.update();
        ball.detectCollision(balls);
        ball.draw();
    });

    requestAnimationFrame(loop);
}

loop();


balls.push(createBall());
window.onclick = function () {
    balls.push(createBall());
};