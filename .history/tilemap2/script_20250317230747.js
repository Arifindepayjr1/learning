function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(BACKGROUND,0,0,canvas.width,canvas.height);
    drawImage(PLAYERSPRITE,PLAYER.frameX * PLAYER.width , PLAYER.frameY * PLAYER.height , PLAYER.width,PLAYER.height,PLAYER.x,PLAYER.y,PLAYER.width,PLAYER.height);
    movePlayer();
    requestAnimationFrame(animate);
}
animate();