const CANVAS = document.getElementById("my-canvas");
const CTX = CANVAS.getContext('2d');
CTX.fillStyle = "red";

CANVAS.width  = 500;
CANVAS.height = 500;
CTX.fillRect(100 , 100 ,CANVAS.width , CANVAS.height);
console.log("javascript");