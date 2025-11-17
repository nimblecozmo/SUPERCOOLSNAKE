# GEMINI.md

## Project Overview

This project is a classic Snake game implemented in HTML, CSS, and JavaScript. The player controls a snake on a 2D grid, aiming to eat food pellets that appear on the screen. Eating a pellet increases the snake's length and the player's score. The game ends if the snake collides with itself.

The game has the following features:
- A scoring system, including a high score that is saved in the browser's local storage.
- A pet system where players can buy eggs to hatch pets that provide a score multiplier.
- A rebirth system that allows players to reset their progress for a permanent score multiplier.
- Autopilot and Auto-clicker modes.
- Speed controls to adjust the game's difficulty.
- Mobile-friendly controls.

## Building and Running

This is a simple web project with no build process. To run the game, open the `index.html` file in a web browser.

## Development Conventions

The project follows a simple structure with three main files:

- `index.html`: The main HTML file that defines the structure of the game's UI.
- `style.css`: The stylesheet that defines the visual appearance of the game.
- `script.js`: The JavaScript file that contains all the game logic.

The JavaScript code is written in a procedural style and is not bundled or minified. It uses the Canvas API to render the game and interacts with the DOM to update the score and other UI elements. The code is well-commented and easy to follow.
