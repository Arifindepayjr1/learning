// character.js
const SPRITE_WIDTH = 64;
const SPRITE_HEIGHT = 64; // Corrected to 64 (sprite sheet is 64x64 per frame)
const BORDER_WIDTH = 2;
const SPACING_WIDTH = 2;
const NUM_ROWS = 10;
const NUM_COLUMNS = 6;

// Desired display size for the character
const CHARACTER_DISPLAY_SIZE = 96;

const spriteSheet = new Image();
spriteSheet.src = 'hero.png'; // Adjust path to your sprite sheet (384x640)

// Character state
const character = {
    x: 0 * window.TILE_SIZE, // Start at tile (15, 0) as per spawn point
    y: 15 * window.TILE_SIZE,
    frameX: 0, // Start with first frame (idle)
    frameY: 2, // Start with down direction (row 3)
    frameCount: 0,
    direction: 'down',
    isFighting: false,
    speed: window.TILE_SIZE
};

// Tiles and items that block movement
const blockingBaseTiles = [1, 2, 5, 6, 7, 8, 32];
const blockingItemIDs = [60, 49, 28, 77, 48, 46, 54, 55, 56];

// Collision check
function isWalkable(x, y) {
    // Convert pixel coordinates to tile coordinates
    const tileX = Math.floor(x / window.TILE_SIZE);
    const tileY = Math.floor(y / window.TILE_SIZE);

    // Check map boundaries (20 rows x 30 columns)
    if (tileX < 0 || tileX >= 30 || tileY < 0 || tileY >= 20) {
        console.log(`Out of bounds at tile (${tileY}, ${tileX})`);
        return false;
    }

    // Get tile data
    const baseTile = window.map[tileY][tileX];
    const overlayTile = window.overlayLayer[tileY][tileX];
    const secondOverlayTile = window.secondOverlayLayer[tileY][tileX];

    // Check for blocking base tiles
    if (blockingBaseTiles.includes(baseTile)) {
        console.log(`Blocked by base tile ${baseTile} at (${tileY}, ${tileX})`);
        return false;
    }

    // Check for blocking overlay items
    if (overlayTile && blockingItemIDs.includes(overlayTile)) {
        console.log(`Blocked by overlay itemID ${overlayTile} at (${tileY}, ${tileX})`);
        return false;
    }

    // Check for blocking second overlay items
    if (secondOverlayTile && blockingItemIDs.includes(secondOverlayTile)) {
        console.log(`Blocked by second overlay itemID ${secondOverlayTile} at (${tileY}, ${tileX})`);
        return false;
    }

    return true;
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

    // Apply collision check
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