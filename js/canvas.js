import Ball from './ball.js';
import { randomIntFromRange, randomColor } from './util.js';

let ballArray = [];
const counter = document.querySelector('#count')
export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
const maxBalls = 50;
const colors = [
  "#8be9fd",
  "#bd93f9",
  "#6272a4",
  "#ff79c6",
  "#ff5555",
  "#ffb86c",
  "#f1fa8c",
  "#50fa7b",
];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust canvas size on window resize.
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

window.addEventListener('click', () => init());

/**
 * Initialize the balls.
 */
function init() {
  const ballsToAdd = randomIntFromRange(0, maxBalls - ballArray.length);

  for (let i = 0; i < ballsToAdd; i++) {
    const radius = randomIntFromRange(10, 40);
    const x = randomIntFromRange(radius, canvas.width - radius);
    const y = randomIntFromRange(0, canvas.height - radius);
    const dx = randomIntFromRange(-2, 2);
    const dy = randomIntFromRange(-2, 2);

    ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors)))
  }
}

/**
 * Animate the balls.
 */
function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ballArray = ballArray.filter(ball => ball.radius !== 0);
  counter.textContent = ballArray.length;

  ballArray.forEach(ball => {
   ball.update();
  })
}

animate();
