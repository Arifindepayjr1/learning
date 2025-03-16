import React, { useEffect, useRef, useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const canvasRef = useRef(null);
  const [keys, setKeys] = useState({});
  const [player, setPlayer] = useState({
    x: 100,
    y: 100,
    width: 150,
    height: 157,
    frameX: 0,
    frameY: 0,
    speed: 4,
    moving: false,
  });

  const PLAYERSPRITE = useRef(new Image());
  PLAYERSPRITE.current.src = ".png'; // Path to player sprite image
  const BACKGROUND = useRef(new Image());
  BACKGROUND.current.src = '3858.jpg'; // Path to background image

  useEffect(() => {
    // Initialize the canvas context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH) {
      ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

    const movePlayer = () => {
      setPlayer((prevPlayer) => {
        const updatedPlayer = { ...prevPlayer };

        if (keys[38] && updatedPlayer.y > 0) {
          updatedPlayer.y -= updatedPlayer.speed;
          updatedPlayer.frameY = 2.5; // Up frame
        }
        if (keys[37] && updatedPlayer.x > 0) {
          updatedPlayer.x -= updatedPlayer.speed;
          updatedPlayer.frameY = 0.8; // Left frame
        }
        if (keys[39] && updatedPlayer.x < 550) {
          updatedPlayer.x += updatedPlayer.speed;
          updatedPlayer.frameY = 1.5; // Right frame
        }
        if (keys[40] && updatedPlayer.y < 300) {
          updatedPlayer.y += updatedPlayer.speed;
          updatedPlayer.frameX = 0; // Down frame
          updatedPlayer.frameY = 0;
        }

        return updatedPlayer;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.drawImage(BACKGROUND.current, 0, 0, canvas.width, canvas.height); // Draw background
      drawImage(
        PLAYERSPRITE.current,
        player.frameX * player.width,
        player.frameY * player.height,
        player.width,
        player.height,
        player.x,
        player.y,
        player.width,
        player.height
      );
      movePlayer(); // Update player position

      requestAnimationFrame(animate); // Loop the animation
    };

    animate(); // Start the animation loop

    // Keyboard event listeners
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.keyCode]: true }));
    };

    const handleKeyUp = (e) => {
      setKeys((prevKeys) => {
        const updatedKeys = { ...prevKeys };
        delete updatedKeys[e.keyCode];
        return updatedKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys, player]);

  return (
    <div className="App">
      <canvas ref={canvasRef} id="canvas1" />
    </div>
  );
}

export default App;
