// ============================================================
// bricks.js: where the bricks are, and how they are drawn
// ============================================================

const BRICK_COLUMNS = 8;
const BRICK_ROWS = 4;
const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 6;     // empty space between bricks
const BRICKS_TOP = 50;   // how far down the first row starts

// Builds the list of bricks. Each brick is an object with an
// x, y, width, and height.
function makeBricks() {
  const list = [];

  // Center the whole block of bricks on the screen.
  const totalWidth = BRICK_COLUMNS * BRICK_WIDTH + (BRICK_COLUMNS - 1) * BRICK_GAP;
  const left = (WIDTH - totalWidth) / 2;

  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLUMNS; col++) {
      const isFlowerBomb = row === 2 && col === 3;
      list.push({
        x: left + col * (BRICK_WIDTH + BRICK_GAP),
        y: BRICKS_TOP + row * (BRICK_HEIGHT + BRICK_GAP),
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
        row,
        col,
        color: isFlowerBomb ? "#fff0f5" : row === 0 ? "hotpink" : row === 1 ? "lightpink" : "white",
        isFlowerBomb,
        hitsRemaining: 3
      });
    }
  }

  return list;
}

// Draws every brick in the list.
function drawBricks() {
  for (const brick of bricks) {
    ctx.fillStyle = brick.color;
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    if (brick.wasHit) {
      ctx.strokeStyle = "#7de3d1";
      ctx.lineWidth = 2;
      ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
    }
    if (brick.isFlowerBomb) {
      drawMiniFlowers(brick);
    }
  }

function drawMiniFlowers(brick) {
  const centerY = brick.y + brick.height / 2;
  for (const centerX of [brick.x + 14, brick.x + 30, brick.x + 46]) {
    ctx.fillStyle = "#f3a5c4";
    for (let petal = 0; petal < 5; petal++) {
      const angle = (Math.PI * 2 * petal) / 5;
      ctx.beginPath();
      ctx.arc(centerX + Math.cos(angle) * 2.5, centerY + Math.sin(angle) * 2.5, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#7de3d1";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}
}
