"use strict";
class Canvas {
    constructor() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.ctx = ctx;
        this.CANVAS_HEIGHT = 600;
        this.CANVAS_WIDTH = 1000;
        this.canvas.height = this.CANVAS_HEIGHT;
        this.canvas.width = this.CANVAS_WIDTH;
        this.fillStyle = "rgb(0,0,0)";
        this.ball = new Ball(this.ctx, this.CANVAS_HEIGHT, this.CANVAS_WIDTH);
        this.LeftPaddle = new LeftPaddle(this.ctx, this.CANVAS_HEIGHT, this.CANVAS_WIDTH);
        this.RightPaddle = new RightPaddle(this.ctx, this.CANVAS_HEIGHT, this.CANVAS_WIDTH);
    }
    ClickListener() {
        addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp")
                this.RightPaddle.direction.up = true;
            if (e.key === "ArrowDown")
                this.RightPaddle.direction.down = true;
            if (e.key === "w")
                this.LeftPaddle.direction.up = true;
            if (e.key === "s")
                this.LeftPaddle.direction.down = true;
        });
        addEventListener("keyup", (e) => {
            if (e.key === "ArrowUp")
                this.RightPaddle.direction.up = false;
            if (e.key === "ArrowDown")
                this.RightPaddle.direction.down = false;
            if (e.key === "w")
                this.LeftPaddle.direction.up = false;
            if (e.key === "s")
                this.LeftPaddle.direction.down = false;
        });
    }
    drawElements() {
        this.ClickListener();
        this.colision();
        this.ball.move();
        this.RightPaddle.move();
        this.LeftPaddle.move();
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.beginPath();
        this.ball.draw();
        this.LeftPaddle.draw();
        this.RightPaddle.draw();
        this.ctx.fill();
        requestAnimationFrame(() => this.drawElements());
    }
    colision() {
        if (this.ball.x + this.ball.R > this.RightPaddle.x &&
            this.ball.x - this.ball.R < this.RightPaddle.x + this.RightPaddle.w / 2 &&
            this.ball.y > this.RightPaddle.y &&
            this.ball.y < this.RightPaddle.y + this.RightPaddle.h) {
            this.ball.direction.right = false;
            this.ball.direction.left = true;
        }
        if (this.ball.x + this.ball.R > this.LeftPaddle.x &&
            this.ball.x - this.ball.R < this.LeftPaddle.x + this.LeftPaddle.w / 2 &&
            this.ball.y > this.LeftPaddle.y &&
            this.ball.y < this.LeftPaddle.y + this.LeftPaddle.h) {
            this.ball.direction.right = true;
            this.ball.direction.left = false;
        }
    }
}
class Ball {
    constructor(ctx, screenH, screenW) {
        this.ctx = ctx;
        this.screenH = screenH;
        this.screenW = screenW;
        this.R = 30;
        this.x = (screenW - this.R) / 2;
        this.y = (screenH - this.R) / 2;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.direction = {
            down: false,
            left: false,
            right: true,
            up: true,
        };
        this.speed = 7;
    }
    draw() {
        this.ctx.arc(this.x, this.y, this.R, this.startAngle, this.endAngle);
    }
    move() {
        if (this.direction.up)
            this.y -= this.speed;
        if (this.direction.down)
            this.y += this.speed;
        if (this.direction.left)
            this.x -= this.speed;
        if (this.direction.right)
            this.x += this.speed;
        this.border();
    }
    border() {
        if (this.y - this.R < 0) {
            this.direction.up = false;
            this.direction.down = true;
        }
        if (this.y + this.R > this.screenH) {
            this.direction.up = true;
            this.direction.down = false;
        }
    }
}
class LeftPaddle {
    constructor(ctx, screenH, screenW) {
        this.ctx = ctx;
        this.rateH = 0.3;
        this.rateW = 0.04;
        this.h = screenH * this.rateH;
        this.w = screenW * this.rateW;
        this.screenH = screenH;
        this.screenW = screenW;
        this.x = this.w;
        this.y = (this.screenH - this.h) / 2;
        this.direction = {
            down: false,
            up: false,
        };
        this.speed = 5;
    }
    draw() {
        this.ctx.rect(this.x, this.y, this.w, this.h);
    }
    move() {
        if (this.direction.down)
            this.y += this.speed;
        if (this.direction.up)
            this.y -= this.speed;
        this.border();
    }
    border() {
        if (this.y < 0)
            this.y = 0;
        if (this.y + this.h > this.screenH)
            this.y = this.screenH - this.h;
    }
}
class RightPaddle {
    constructor(ctx, screenH, screenW) {
        this.ctx = ctx;
        this.rateH = 0.3;
        this.rateW = 0.04;
        this.h = screenH * this.rateH;
        this.w = screenW * this.rateW;
        this.screenH = screenH;
        this.screenW = screenW;
        this.x = screenW - this.w * 2;
        this.y = (this.screenH - this.h) / 2;
        this.direction = {
            down: false,
            up: false,
        };
        this.speed = 5;
    }
    draw() {
        this.ctx.rect(this.x, this.y, this.w, this.h);
    }
    move() {
        if (this.direction.down)
            this.y += this.speed;
        if (this.direction.up)
            this.y -= this.speed;
        this.border();
    }
    border() {
        if (this.y < 0)
            this.y = 0;
        if (this.y + this.h > this.screenH)
            this.y = this.screenH - this.h;
    }
}
const canvas = new Canvas();
canvas.drawElements();
