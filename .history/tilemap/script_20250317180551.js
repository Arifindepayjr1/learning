const CANVAS = document.getElementById("my-canvas");
const CTX = CANVAS.getContext('2d');

CANVAS.width  = 500;
CANVAS.height = 500;
CTX.fillStyle = "red";

CTX.fillRect(400,400 ,CANVAS.width , CANVAS.height);
console.log("javascript");