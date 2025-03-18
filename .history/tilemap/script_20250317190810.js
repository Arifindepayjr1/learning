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

let atlasCol  = 26;
let atlasRow  = 32;
let mapCol    = 30;
let mapRow    = 20;
let mapHeight = mapRow * tileSize;
let mapWidth  = mapCol * tileSize;


let level1Map = [ 528, 529, 530, 531, 532, 533, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 528, 529, 530, 531, 532, 533, 0, 0, 0, 0,
                  555, 556, 557, 558, 559, 560, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 555, 556, 557, 558, 559, 560, 0, 0, 0, 0,
                  582, 583, 584, 585, 586, 587, 0, 0, 0, 0, 0, 0, 454, 455, 456, 457, 458, 459, 0, 0, 582, 583, 584, 585, 586, 587, 0, 0, 0, 0,
                  609, 610, 611, 612, 613, 614, 0, 0, 0, 0, 0, 0, 481, 482, 483, 484, 485, 486, 0, 0, 609, 610, 611, 612, 613, 614, 0, 0, 0, 0,
                  636, 637, 638, 639, 640, 641, 0, 0, 0, 0, 456, 457, 508, 509, 510, 511, 512, 513, 0, 0, 636, 637, 638, 639, 640, 641, 0, 0, 0, 0,
                  663, 664, 665, 666, 667, 668, 0, 0, 0, 482, 483, 484, 535, 536, 537, 538, 539, 540, 0, 0, 663, 664, 665, 666, 667, 668, 533, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 508, 509, 510, 511, 512, 563, 564, 565, 566, 567, 0, 0, 0, 555, 556, 557, 558, 559, 560, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 535, 536, 537, 538, 539, 590, 591, 592, 593, 594, 0, 0, 0, 582, 583, 584, 585, 586, 587, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 562, 563, 564, 565, 566, 617, 618, 619, 620, 621, 0, 0, 0, 609, 610, 611, 612, 613, 614, 0, 0, 0,
                  0, 528, 529, 530, 531, 532, 533, 0, 589, 590, 591, 592, 593, 644, 645, 646, 647, 648, 0, 0, 0, 636, 637, 638, 639, 640, 641, 0, 0, 0,
                  0, 555, 556, 557, 558, 559, 560, 0, 616, 617, 618, 619, 620, 621, 672, 673, 674, 675, 0, 0, 0, 663, 664, 665, 666, 667, 668, 0, 0, 0,
                  0, 582, 583, 584, 585, 586, 587, 0, 643, 644, 645, 646, 647, 648, 699, 700, 701, 702, 1150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 609, 610, 611, 612, 613, 614, 0, 0, 671, 672, 673, 0, 0, 0, 0, 0, 1176, 1177, 1178, 1179, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 636, 637, 638, 639, 640, 641, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1203, 1204, 1205, 1206, 1207, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 663, 664, 665, 666, 667, 668, 0, 0, 0, 1150, 0, 0, 0, 0, 0, 0, 1230, 1231, 1232, 1233, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 1176, 1177, 1178, 1179, 0, 1176, 1177, 1178, 1179, 1258, 1176, 1177, 1178, 1179, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 1202, 1203, 1204, 1205, 1206, 1202, 1203, 1204, 1205, 1206, 1202, 1203, 1204, 1205, 1206, 1207, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 1229, 1230, 1231, 1232, 1233, 1229, 1230, 1231, 1232, 1233, 1229, 1230, 1231, 1232, 1233, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1258, 0, 0, 0, 0, 1258, 0, 0, 0, 0, 1258, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


let mapIndex = 0;
let sourceX  = 0;
let sourceY  = 0;


function draw()
{
    for(let col = 0; col < mapHeight; col += tileSize)
    {
        for(let row = 0; row < mapWidth; row += tileSize)
        {
            let tileval
        }
    }
}