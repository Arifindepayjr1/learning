const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");


const background = new Image();
background.src = 'map.png';

function animate()
{
    ctx.drawImage(background,0,0,canvas.width,canvas.height);

}
animate();