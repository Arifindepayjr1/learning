// JavaScript to handle text change on click
function changeText(element) {
    const originalText = element.innerHTML;
    switch(originalText) {
        case "New Game":
            element.innerHTML = "Loading New World...";
            break;
        case "Continue":
            element.innerHTML = "Resuming Dark Quest...";
            break;
        case "Exit":
            element.innerHTML = "Escape is Imminent...";
            break;
        default:
            element.innerHTML = "Game Over...";
    }

    // Reset text after 2 seconds for a spooky effect
    setTimeout(() => {
        element.innerHTML = originalText;
    }, 2000);
}

// Function to handle the "New Game" button click
function startNewGame() {
    // Hide the original menu

    
    // Show the new game options menu
    document.getElementById('newGameMenu').style.display = 'block';
}

// Function to handle Exit (you can extend this to close or reset the game)
function exitGame() {
    console.log("Exiting the game...");
    alert("The game is closing...");
}
