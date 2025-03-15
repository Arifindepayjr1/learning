const canvas = document.getElementById("canvas1");
const ctx    = canvas.getContext('2d'); 

canvas.width  = 800;
canvas.height = 500;

const KEYS = [];

const PLAYER = {
    x: 0,
    y: 0,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

const PLAYERSPRITE = new Image();
PLAYERSPRITE.src = "44427.jpg";

PLAYERSPRITE.onload = function()
{
    const width = PLAYERSPRITE.naturalWidth;
    const height = PL
}