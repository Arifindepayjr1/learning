// character.js
const SPRITE_WIDTH = 67;
const SPRITE_HEIGHT = 69;
const BORDER_WIDTH = 2;
const SPACING_WIDTH = 2;
const NUM_ROWS = 10;
const NUM_COLUMNS = 6;

const spriteSheet = new Image();
spriteSheet.src = 'player.png'; // Adjust path to your sprite sheet (384x640)

// Character state
const character = {
    x: 15 * window.TILE_SIZE, // Start at tile (10, 15)
    y: 10 * window.TILE_SIZE,
    frameX: 0, // Current frame column
    frameY: 0, // Current frame row (0 = down, 1 = up, 2 = left, 3 = right, 4 = fighting)
    frameCount: 0, // Animation frame counter
    direction: 'down', // Current direction
    isFighting: false,
    speed: window.TILE_SIZE // Move 1 tile at a time
};

// Walkable tiles (adjust based on your map)
const walkableTiles = [12, 11, 18]; // Grass, Path, Royal-floor

function isWalkable(x, y) {
    const tileX = Math.floor(x / window.TILE_SIZE);
    const tileY = Math.floor(y / window.TILE_SIZE);
    if (tileX < 0 || tileX >= 30 || tileY < 0 || tileY >= 20) return false;
    const baseTile = window.map[tileY][tileX];
    const overlayTile = window.overlayLayer[tileY][tileX];
    const secondOverlayTile = window.secondOverlayLayer[tileY][tileX];
    // Block if overlay or second overlay exists, or base tile isn’t walkable
    return !overlayTile && !secondOverlayTile && walkableTiles.includes(baseTile);
}

function drawCharacter() {
    if (!spriteSheet.complete) return;
    window.ctx.drawImage(
        spriteSheet,
        character.frameX * (SPRITE_WIDTH + BORDER_WIDTH + SPACING_WIDTH) + BORDER_WIDTH,
        character.frameY * (SPRITE_HEIGHT + BORDER_WIDTH + SPACING_WIDTH) + BORDER_WIDTH,
        SPRITE_WIDTH, SPRITE_HEIGHT,
        character.x, character.y,
        window.TILE_SIZE, window.TILE_SIZE // Scale to tile size
    );
}

function updateAnimation() {
    character.frameCount++;
    if (character.isFighting) {
        if (character.frameCount % 10 === 0) { // Slower fighting animation
            character.frameX = (character.frameX + 1) % 4; // Assume 4 fighting frames
            if (character.frameX === 0) character.isFighting = false; // End fighting
        }
    } else if (character.frameCount % 5 === 0) { // Walking animation speed
        character.frameX = (character.frameX + 1) % 4; // Assume 4 walking frames
    }
}

// Handle input
document.addEventListener('keydown', (e) => {
    let newX = character.x;
    let newY = character.y;

    switch (e.key.toLowerCase()) {
        case 'w':
            newY -= character.speed;
            character.direction = 'up';
            character.frameY = 1;
            break;
        case 's':
            newY += character.speed;
            character.direction = 'down';
            character.frameY = 0;
            break;
        case 'a':
            newX -= character.speed;
            character.direction = 'left';
            character.frameY = 2;
            break;
        case 'd':
            newX += character.speed;
            character.direction = 'right';
            character.frameY = 3;
            break;
        case 'j':
            character.isFighting = true;
            character.frameY = 4; // Fighting row
            character.frameX = 0;
            break;
    }

    if (!character.isFighting && isWalkable(newX, newY)) {
        character.x = newX;
        character.y = newY;
    }
});

// Game loop
function gameLoop() {
    window.drawMap();
    updateAnimation();
    drawCharacter();
    requestAnimationFrame(gameLoop);
}

spriteSheet.onload = () => {
    console.log('Sprite sheet loaded');
    gameLoop();
};