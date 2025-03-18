// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants
const TILE_SIZE = 16; // Each tile is 16x16 pixels
const MAP_WIDTH = 20; // Map is 20 tiles wide
const MAP_HEIGHT = 20; // Map is 20 tiles tall

// Load the tileset
const tileset = new Image();
tileset.src = 'megacity.png'; // Path to your tileset image

// Map data (approximated from the second image)
// 0 = Grass, 1 = Path, 2 = Wall, 3 = Tree, 4 = Building, 5 = Water
const map = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 1, 1, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 4, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 4, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

// Tile positions in the tileset (in pixels)
// These are approximate coordinates based on the tileset image
const tilePositions = {
    0: { x: 0, y: 0 },    // Grass
    1: { x: 16, y: 0 },   // Path
    2: { x: 32, y: 0 },   // Wall
    3: { x: 48, y: 0 },   // Tree
    4: { x: 64, y: 0 },   // Building
    5: { x: 80, y: 0 }    // Water (if needed)
};

// Render the map
function drawMap() {
    for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            const tile = map[y][x];
            const pos = tilePositions[tile];
            ctx.drawImage(
                tileset,
                pos.x, pos.y, TILE_SIZE, TILE_SIZE, // Source rectangle
                x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE // Destination rectangle
            );
        }
    }
}

// Draw the map when the tileset is loaded
tileset.onload = () => {
    drawMap();
};