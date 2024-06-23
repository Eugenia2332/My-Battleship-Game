This is a simple implementation of the classic Battleship game using HTML, CSS, and JavaScript. Players can guess the locations of hidden ships on a board and receive feedback on hits and misses. The objective is to sink all the opponent's ships.

Features: 
Interactive Gameplay: Users can input guesses and receive feedback on hits and misses.
Random Ship Placement: Ships are randomly placed on the board at the start of each game.
Win Condition: The game notifies the player when all ships have been sunk.

Key Functions are:
View Object:
displayMessage(msg): Displays a message to the user.
displayHit(location): Marks a cell as a hit.
displayMiss(location): Marks a cell as a miss.

Model Object:
fire(guess): Handles a user's guess, updating the board and checking for hits and misses.
isSunk(ship): Checks if a ship is sunk.
generateShipLocations(): Randomly generates locations for ships.
generateShip(): Generates a single ship's location.
collision(locations): Checks for collisions with other ships.

Controller Object:
processGuess(guess): Processes the user's guess and updates the game state.

Helper Functions:
parseGuess(guess): Parses the user's guess into board coordinates.
init(): Initializes the game on window load.
handleFireButton(): Handles the "Fire!" button click event.
handleKeyPress(e): Handles the Enter key press event.

Contributions are welcome! If you have any ideas or improvements, feel free to fork the repository and submit a pull request.
