const canvas = document.getElementById("canvas1");
const ctx    = canvas.getContext('2d'); 

canvas.width  = 800;
canvas.height = 500;

const KEYS = [];

const PLAYER = {
    x: 0,
    y: 0,
    width: 200,
    height: 160, 
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

const PLAYERSPRITE = new Image();
PLAYERSPRITE.src = "1.png";

const BACKGROUND = new Image();
BACKGROUND.src = "3858.jpg";

function drawImage(img , sX,  sY, sW, sH, dX, dY, dW, dH)
{
    ctx.drawImage(img , sX, sY, sW , sH , dX , dY , dW, dH);
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(BACKGROUND,0,0,canvas.width,canvas.height);
    drawImage(PLAYERSPRITE,0,0,PLAYER.width,PLAYER.height,50,100,PLAYER.width,PLAYER.height);
    requestAnimationFrame(animate);
}
animate();


window.addEventListener("keydown", function(e){
    KEYS[e.keyCode] = true;
})