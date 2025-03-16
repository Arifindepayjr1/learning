const canvas = document.getElementById("canvas1");
const ctx    = canvas.getContext('2d'); 

canvas.width  = 800;
canvas.height = 500;

const KEYS = [];

const PLAYER = {
    x: 100,
    y: 100,
    width: 200,
    height: 160, 
    frameX: 2,
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
    drawImage(PLAYERSPRITE,PLAYER.frameX * PLAYER.width , PLAYER.frameY * PLAYER.height , PLAYER.width,PLAYER.height,PLAYER.x,PLAYER.y,PLAYER.width,PLAYER.height);
    movePlayer();
    requestAnimationFrame(animate);
}
animate();


window.addEventListener("keydown", function(e){
    KEYS[e.keyCode] = true;

});

window.addEventListener("keyup" , function(e){
    delete KEYS[e.keyCode];
});

function movePlayer()
{
    if(KEYS[38])
    {
        PLAYER.y = PLAYER.y - PLAYER.speed;
    }
}