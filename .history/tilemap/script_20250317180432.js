const CANVAS = document.getElementById("my-canvas");
const CTX = CANVAS.getContext('2d');

CANVAS.width  = 500;
CANVAS.height = 500;
CTX.fillRect(100 , 100 ,CANVAS.width , CANVAS.height);
CTX.fillStyle = "red"
console.log("javascript");