const CANVAS = document.getElementById("my-canvas");
const CTX = CANVAS.getContext('2d');

CANVAS.width  = 500;
CANVAS.height = 500;

CTX.fillStyle = "red";

CTX.fillRect(0 , 0 ,CANVAS.width , CANVAS.height);


let tileAtlas = new Image();
tileAtlas = "pngegg.png";
tileAtlas.onload = drawFunction;

let tileSize = 32;
let tileOutputSize = 1.5;
let updateTileSize = tileSize * tileOutputSize;

let atlasCol = 26;
let atlasRow = 32;
let mapcol   = 30;
let 