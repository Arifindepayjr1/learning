// character.js
const SPRITE_WIDTH = 64;
const SPRITE_HEIGHT = 64;
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

// Get spawn position from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const spawnRow = parseInt(urlParams.get('spawnRow')) || (window.currentMap === 'tilemap1' ? 15 : 4); // Row 15 for tilemap1, row 4 for tilemap2
const spawnCol = parseInt(urlParams.get('spawnCol')) || (window.currentMap === 'tilemap1' ? 0 : 12); // Col 0 for tilemap1, col 12 for tilemap2

// Character state
const character = {
    x: spawnCol * window.TILE_SIZE,
    y: spawnRow * window.TILE_SIZE,
    frameX: 0,
    frameY: 2,
    frameCount: 0,
    direction: 'down',
    isFighting: false,
    moving: false
};

// Track pressed keys
const keys = {
    w: false,
    s: false,
    a: false,
    d: false,
    j: false
};

// Tiles and items that block movement
const blockingBaseTiles = [1, 2, 3, 4, 5, 6, 7, 8, 13, 16, 21, 22, 23, 31, 32, 36, 57, 59, 60, 77, 89]; // Removed 51 and 49
const blockingItemIDs = [25, 26, 27, 28, 33, 35, 37, 40, 41, 42, 43, 45, 46, 48, 49, 54, 55, 56, 58, 60, 61, 62, 77];

// Transition delay to prevent immediate re-transition (in milliseconds)
const TRANSITION_COOLDOWN = 1000; // 1 second
let lastTransitionTime = 0;

// Collision check
function isWalkable(x, y) {
    const tileX = Math.floor(x / window.TILE_SIZE);
    const tileY = Math.floor(y / window.TILE_SIZE);

    if (tileX < 0 || tileX >= 30 || tileY < 0 || tileY >= 20) {
        console.log(`Out of bounds at tile (${tileY}, ${tileX})`);
        return false;
    }

    const baseTile = window.map[tileY][tileX];
    const overlayTile = window.overlayLayer[tileY][tileX];
    const secondOverlayTile = window.secondOverlayLayer[tileY][tileX];

    if (blockingBaseTiles.includes(baseTile)) {
        console.log(`Blocked by base tile ${baseTile} at (${tileY}, ${tileX})`);
        return false;
    }

    if (overlayTile && blockingItemIDs.includes(overlayTile)) {
        console.log(`Blocked by overlay itemID ${overlayTile} at (${tileY}, ${tileX})`);
        return false;
    }

    if (secondOverlayTile && blockingItemIDs.includes(secondOverlayTile)) {
        console.log(`Blocked by second overlay itemID ${secondOverlayTile} at (${tileY}, ${tileX})`);
        return false;
    }

    return true;
}

// Check for map transitions
function checkMapTransition() {
    const tileX = Math.floor(character.x / window.TILE_SIZE);
    const tileY = Math.floor(character.y / window.TILE_SIZE);
    const currentTime = Date.now();

    // Check if enough time has passed since the last transition
    if (currentTime - lastTransitionTime < TRANSITION_COOLDOWN) {
        return;
    }

    if (window.currentMap === 'tilemap1') {
        if (tileY === 2 && tileX === 24) { // Transition to tilemap2
            startTransition('tilemap2.html?spawnRow=4&spawnCol=12');
            lastTransitionTime = currentTime;
        }
    } else if (window.currentMap === 'tilemap2') {
        if (tileY === 3 && tileX === 12) { // Transition back to tilemap1
            startTransition('index.html?spawnRow=2&spawnCol=23');
            lastTransitionTime = currentTime;
        }
    }
}

function startTransition(url) {
    if (window.isTransitioning) return;
    window.isTransitioning = true;
    window.transitionAlpha = 0;
    window.transitionFadeIn = false;
    window.transitionTarget = url;
}

function updateTransition() {
    if (!window.isTransitioning) return;

    if (!window.transitionFadeIn) {
        // Fade to black
        window.transitionAlpha += 0.05;
        if (window.transitionAlpha >= 1) {
            window.transitionAlpha = 1;
            window.transitionFadeIn = true;
            // Redirect to the new map
            window.location.href = window.transitionTarget;
        }
    } else {
        // Fade back in
        window.transitionAlpha -= 0.05;
        if (window.transitionAlpha <= 0) {
            window.transitionAlpha = 0;
            window.isTransitioning = false;
            window.transitionTarget = null;
        }
    }
}

function drawCharacter() {
    if (!spriteSheet.complete) {
        console.log('Sprite sheet not loaded yet');
        return;
    }
    const srcX = character.frameX * (SPRITE_WIDTH + BORDER_WIDTH + SPACING_WIDTH) + BORDER_WIDTH;
    const srcY = character.frameY * (SPRITE_HEIGHT + BORDER_WIDTH + SPACING_WIDTH) + BORDER_WIDTH;

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
            character.frameX = (character.frameX + 1) % 4;
            if (character.frameX === 0) character.isFighting = false;
        }
    } else if (isMoving && character.frameCount % 5 === 0) {
        character.frameX = (character.frameX + 1) % 4;
    } else if (!isMoving) {
        character.frameX = 0;
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
        character.frameY = 6;
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

// Update character position
function updateCharacter() {
    if (window.isTransitioning) return;

    let newX = character.x;
    let newY = character.y;
    let isMoving = false;

    if (keys.w) {
        newY -= CHARACTER_SPEED;
        character.direction = 'up';
        character.frameY = 5;
        isMoving = true;
    }
    if (keys.s) {
        newY += CHARACTER_SPEED;
        character.direction = 'down';
        character.frameY = 2;
        isMoving = true;
    }
    if (keys.a) {
        newX -= CHARACTER_SPEED;
        character.direction = 'left';
        character.frameY = 4;
        isMoving = true;
    }
    if (keys.d) {
        newX += CHARACTER_SPEED;
        character.direction = 'right';
        character.frameY = 3;
        isMoving = true;
    }

    if (!character.isFighting && isMoving && isWalkable(newX, newY)) {
        character.x = newX;
        character.y = newY;
        character.moving = true;
    } else {
        character.moving = false;
    }

    updateAnimation(character.moving);
    checkMapTransition();
}

function gameLoop() {
    updateCharacter();
    updateTransition();
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