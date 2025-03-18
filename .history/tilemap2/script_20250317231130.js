const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

canvas.width  = 1200;
canvas.height = 1200; 

const background = new Image();
background.src = 'map.png';

// Wait until the image is fully loaded before drawing
background.onload = function () {
    animate();
};

function animate() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}
