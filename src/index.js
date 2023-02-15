"strict mode";

const ctx = document.getElementById("canvas").getContext("2d");
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
ctx.width = CANVAS_WIDTH;
ctx.height = CANVAS_HEIGHT;
class Ball {
  constructor() {
    this.radius = 30;
    this.x = (CANVAS_WIDTH - this.radius) / 2;
    this.y = (CANVAS_HEIGHT - this.radius) / 2;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.directions = {
      up: false,
      left: false,
      down: false,
      right: false,
    };
    this.speed = 3;
  }
  draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.fill();
    this.move();
    requestAnimationFrame(() => this.draw());
  }
  move() {
    if (this.directions.left) this.x -= this.speed;
    if (this.directions.right) this.x += this.speed;
    if (this.directions.down) this.y += this.speed;
    if (this.directions.up) this.y -= this.speed;
    if (this.x < this.radius) this.x = this.radius;
    if (this.y < this.radius) this.y = this.radius;
    if (this.x > CANVAS_WIDTH - this.radius) this.x = CANVAS_WIDTH - this.radius;
    if (this.y > CANVAS_HEIGHT - this.radius) this.y = CANVAS_HEIGHT - this.radius;
  }
}
const ball = new Ball();
ball.draw();
addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") ball.directions.right = true;
  if (e.key === "ArrowUp") ball.directions.up = true;
  if (e.key === "ArrowLeft") ball.directions.left = true;
  if (e.key === "ArrowDown") ball.directions.down = true;
  console.log(e.key);
});
addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") ball.directions.right = false;
  if (e.key === "ArrowUp") ball.directions.up = false;
  if (e.key === "ArrowLeft") ball.directions.left = false;
  if (e.key === "ArrowDown") ball.directions.down = false;
});
