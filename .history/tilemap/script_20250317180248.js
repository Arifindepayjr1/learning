const CANVAS = document.getElementById("my-canvas");
CANVAS.style.backGroundColor = "blue";
const CTX = CANVAS.getContext('2d');
CTX.fillRect(100 , 100 ,CANVAS.width , CANVAS.height);
CTX.fillStyle = "black";

console.log("javascript");