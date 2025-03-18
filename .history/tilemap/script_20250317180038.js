const CANVAS = document.getElementById("my-canvas");
CANVAS.style.backgroundColor = "blue";

const CTX = CANVAS.getContext("2d");
CTX.fillRec(100 , 100 ,CANVAS.width , CANVAS.height)