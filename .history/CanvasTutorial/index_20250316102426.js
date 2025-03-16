const canvas = document.getElementById("canvas1");
const ctx    = canvas.getContext('2d'); 

canvas.width  = 800;
canvas.height = 500;

const KEYS = [];

const PLAYER = {
    x: 100,
    y: 100,
    width: 150,
    height: 157, 
    frameX: 0,
    frameY: 0,
    speed: 4,
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
window.addEventListener("keydown", function(e){
    KEYS[e.keyCode] = true;
    PLAYER.moving = true;
});

window.addEventListener("keyup" , function(e){
    delete KEYS[e.keyCode];
    PLAYER.moving = false;
});

function movePlayer()
{
    if(KEYS[38] && PLAYER.y > 0)
    {
        PLAYER.y = PLAYER.y - PLAYER.speed;
        PLAYER.frameY = 2.5;PLAYER.frameY = 2.5;
        PLAYER.moving = true;
    }
    if(KEYS[37] && PLAYER.x > 0)
    {
        PLAYER.x = PLAYER.x - PLAYER.speed;
        PLAYER.frameY = 0.8;
        PLAYER.moving = true;
    }
    if(KEYS[39] && PLAYER.x < 550)
    {
        PLAYER.x = PLAYER.x + PLAYER.speed;
        PLAYER.frameY = 1.5;
        PLAYER.moving = true;
    /*
        if(PLAYER.x > 450 && PLAYER.y > 20)
        {
            PLAYER.x = 450;
        }
    */
    }
    if(KEYS[40] && PLAYER.y < 300)
    {
        PLAYER.y = PLAYER.y + PLAYER.speed;
        PLAYER.frameX = 0;
        PLAYER.frameY = 0;
        PLAYER.moving = true;
    }
}

function handlePlayer()
{
    if(PLAYER.frameX < 2 && PLAYER.moving) PLAYER.frameX++;
    else PLAYER.frameX = 0;
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(BACKGROUND,0,0,canvas.width,canvas.height);
    drawImage(PLAYERSPRITE,PLAYER.frameX * PLAYER.width , PLAYER.frameY * PLAYER.height , PLAYER.width,PLAYER.height,PLAYER.x,PLAYER.y,PLAYER.width,PLAYER.height);
    movePlayer();
    handlePlayer();
    requestAnimationFrame(animate);
}
animate();
