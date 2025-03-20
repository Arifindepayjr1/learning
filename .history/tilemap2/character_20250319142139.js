// character.js
const SPRITE_WIDTH = 64;
const SPRITE_HEIGHT = 64;
const BORDER_WIDTH = 2;
const SPACING_WIDTH = 2;
const NUM_ROWS = 10;
const NUM_COLUMNS = 6;

// Desired display size for the character (larger than tile)
const CHARACTER_DISPLAY_SIZE = 64; // 64x64 to match source size

const spriteSheet = new Image();
spriteSheet.src = 'hero.png'; // Adjust path to your sprite sheet (384x640)

// Character state
const character = {
    x: 5 * window.TILE_SIZE, // Start at tile (5, 5) to avoid overlays
    y: 5 * window.TILE_SIZE,
    frameX: 0, // Start with first frame (idle)
    frameY: 2, // Start with down direction (row 3)
    frameCount: 0,
    direction: 'down',
    isFighting: false,
    speed: window.TILE_SIZE
};

// Walkable tiles
const walkableTiles = [12, 11, 18]; // Grass, Path, Royal-floor

function isWalkable(x, y) {
    const tileX = Math.floor(x / window.TILE_SIZE);
    const tileY = Math.floor(y / window.TILE_SIZE);
    if (tileX < 0 || tileX >= 30 || tileY < 0 || tileY >= 20) return false;
    const baseTile = window.map[tileY][tileX];
    const overlayTile = window.overlayLayer[tileY][tileX];
    const secondOverlayTile = window.secondOverlayLayer[tileY][tileX];
    return !overlayTile && !secondOverlayTile && walkableTiles.includes(baseTile);
}

function drawCharacter() {
    if (!spriteSheet.complete) {
        console.log('Sprite sheet not loaded yet');
        return;
    }
    const srcX = character.frameX * (SPRITE_WIDTH + BORDER_WIDTH + SPACING_WIDTH) + BORDER_WIDTH;
    const srcY = character.frameY * (SPRITE_HEIGHT + BORDER_WIDTH + SPACING_WIDTH) + BORDER_WIDTH;
    
    // Debug: Log frame coordinates
    console.log(`Drawing frameX: ${character.frameX}, frameY: ${character.frameY}, srcX: ${srcX}, srcY: ${srcY}`);

    // Center the character on the tile (since it's larger than TILE_SIZE)
    const offsetX = (window.TILE_SIZE - CHARACTER_DISPLAY_SIZE) / 2;
    const offsetY = (window.TILE_SIZE - CHARACTER_DISPLAY_SIZE) / 2;

    window.ctx.drawImage(
        spriteSheet,
        srcX, srcY,
        SPRITE_WIDTH, SPRITE_HEIGHT,
        character.x + offsetX, character.y + offsetY,
        CHARACTER_DISPLAY_SIZE, CHARACTER_DISPLAY_SIZE
    );
}

function updateAnimation(isMoving) {
    character.frameCount++;
    if (character.isFighting) {
        if (character.frameCount % 10 === 0) {
            character.frameX = (character.frameX + 1) % 4; // 4 fighting frames
            if (character.frameX === 0) character.isFighting = false;
        }
    } else if (isMoving && character.frameCount % 5 === 0) {
        character.frameX = (character.frameX + 1) % 4; // 4 walking frames
    } else if (!isMoving) {
        character.frameX = 0; // Idle frame
    }
}

document.addEventListener('keydown', (e) => {
    let newX = character.x;
    let newY = character.y;
    let isMoving = false;

    switch (e.key.toLowerCase()) {
        case 'w':
            newY -= character.speed;
            character.direction = 'up';
            character.frameY = 5; // Row 6
            isMoving = true;
            break;
        case 's':
            newY += character.speed;
            character.direction = 'down';
            character.frameY = 2; // Row 3
            isMoving = true;
            break;
        case 'a':
            newX -= character.speed;
            character.direction = 'left';
            character.frameY = 4; // Row 5
            isMoving = true;
            break;
        case 'd':
            newX += character.speed;
            character.direction = 'right';
            character.frameY = 3; // Row 4
            isMoving = true;
            break;
        case 'j':
            character.isFighting = true;
            character.frameY = 6; // Row 7
            character.frameX = 0;
            break;
    }

    if (!character.isFighting && isWalkable(newX, newY)) {
        character.x = newX;
        character.y = newY;
        updateAnimation(isMoving);
    } else if (character.isFighting) {
        updateAnimation(false);
    }

    window.drawMap();
    drawCharacter();
});

function gameLoop() {
    window.drawMap();
    drawCharacter();
    requestAnimationFrame(gameLoop);
}

spriteSheet.onload = () => {
    console.log('Sprite sheet loaded');
    window.drawMap();
    drawCharacter();
    gameLoop();
};

spriteSheet.onerror = () => console.error('Failed to load sprite sheet at hero.png');