// character.js
const SPRITE_WIDTH = 64;
const SPRITE_HEIGHT = 55;
const BORDER_WIDTH = 2;
const SPACING_WIDTH = 2;
const NUM_ROWS = 10;
const NUM_COLUMNS = 6;

// Desired display size for the character
const CHARACTER_DISPLAY_SIZE = 96;

// Reduced speed for smoother movement
const CHARACTER_SPEED = 4; // Move 4 pixels per frame

const spriteSheet = new Image();
spriteSheet.src = 'hero.png'; // Adjust path to your sprite sheet (384x640)

// Character state
const character = {
    x: 0 * window.TILE_SIZE, // Start at tile (15, 0) as per spawn point
    y: 14 * window.TILE_SIZE, // Adjusted for row 15 (now at y=14 * 32 due to row 0 being skipped)
    frameX: 0, // Start with first frame (idle)
    frameY: 2, // Start with down direction (row 3)
    frameCount: 0,
    direction: 'down',
    isFighting: false,
    moving: false // Track if the character is moving
};

// Track pressed keys
const keys = {
    w: false,
    s: false,
    a: false,
    d: false,
    j: false
};

// Tiles and items that block movement (updated based on /*C*/ comments)
const blockingBaseTiles = [1, 2, 5, 6, 7, 8, 16, 21, 22, 31, 32, 51, 60, 77, 89];
const blockingItemIDs = [25, 26, 27, 28, 33, 35, 41, 42, 43, 46, 48, 49, 54, 55, 56, 60, 77];

// Collision check
function isWalkable(x, y) {
    // Convert pixel coordinates to tile coordinates
    const tileX = Math.floor(x / window.TILE_SIZE);
    const tileY = Math.floor(y / window.TILE_SIZE) + 1; // Adjust for row 0 being skipped

    // Check map boundaries (20 rows x 30 columns)
    if (tileX < 0 || tileX >= 30 || tileY < 1 || tileY >= 20) { // Start from row 1
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

// Track key presses
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) {
        keys[key] = true;
    }
    if (key === 'j' && !character.isFighting) {
        character.isFighting = true;
        character.frameY = 6; // Row 7
        character.frameX = 0;
        updateAnimation(false);
        window.drawMap();
        drawCharacter();
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) {
        keys[key] = false;
    }
});

// Update character position based on pressed keys
function updateCharacter() {
    let newX = character.x;
    let newY = character.y;
    let isMoving = false;

    if (keys.w) {
        newY -= CHARACTER_SPEED;
        character.direction = 'up';
        character.frameY = 5; // Row 6
        isMoving = true;
    }
    if (keys.s) {
        newY += CHARACTER_SPEED;
        character.direction = 'down';
        character.frameY = 2; // Row 3
        isMoving = true;
    }
    if (keys.a) {
        newX -= CHARACTER_SPEED;
        character.direction = 'left';
        character.frameY = 4; // Row 5
        isMoving = true;
    }
    if (keys.d) {
        newX += CHARACTER_SPEED;
        character.direction = 'right';
        character.frameY = 3; // Row 4
        isMoving = true;
    }

    // Apply collision check
    if (!character.isFighting && isMoving && isWalkable(newX, newY)) {
        character.x = newX;
        character.y = newY;
        character.moving = true;
    } else {
        character.moving = false;
    }

    // Update animation
    updateAnimation(character.moving);
}

function gameLoop() {
    updateCharacter();
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