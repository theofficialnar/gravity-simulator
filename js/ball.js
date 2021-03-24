import { canvas, ctx } from './canvas.js';

export default function Ball(x, y, dx, dy, radius, color) {  
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.gravity = 1;
  this.xFriction = 0.01;
  this.yFriction = 0.9;
  this.rollTime = 0;
  
  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#44475a';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  this.update = () => {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    
    // Rolltime determines that ball has stopped bouncing
    if (this.rollTime < 60) {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * this.yFriction;
        this.rollTime++;
      } else {
        this.rollTime = 0;
        this.dy += this.gravity;
      }
    } else {
      this.dx -= this.dx * this.xFriction;

      // Pop the ball once it has stopped moving
      if(Math.abs(this.dx) < this.xFriction && this.radius > 0) {
        this.radius--;
        this.y = canvas.height - this.radius;
      }
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}