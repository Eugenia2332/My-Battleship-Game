const view = {
  displayMessage(msg) {
    document.getElementById("messageArea").innerHTML = msg;
  },

  displayHit(location) {
    document.getElementById(location).classList.add("hit");
  },

  displayMiss(location) {
    document.getElementById(location).classList.add("miss");
  },
};

const model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: Array.from({ length: 3 }, () => ({
    locations: Array(3).fill("00"),
    hits: Array(3).fill(""),
  })),

  fire(guess) {
    for (const ship of this.ships) {
      const index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");

        if (this.isSunk(ship)) {
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },

  isSunk(ship) {
    return ship.hits.every((hit) => hit === "hit");
  },

  generateShipLocations() {
    for (let i = 0; i < this.numShips; i++) {
      let locations;
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },

  generateShip() {
    const direction = Math.random() < 0.5;
    let row, col;

    if (direction) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      col = Math.floor(Math.random() * this.boardSize);
    }

    return Array.from({ length: this.shipLength }, (_, i) =>
      direction ? `${row}${col + i}` : `${row + i}${col}`
    );
  },

  collision(locations) {
    return this.ships.some((ship) =>
      locations.some((loc) => ship.locations.includes(loc))
    );
  },
};

function parseGuess(guess) {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (!guess || guess.length !== 2) {
    alert("Please enter a letter and a number on the board.");
    return null;
  }

  const [rowLetter, column] = guess.toUpperCase().split("");
  const row = alphabet.indexOf(rowLetter);

  if (
    row === -1 ||
    isNaN(column) ||
    row >= model.boardSize ||
    column >= model.boardSize
  ) {
    alert("That isn't on the board.");
    return null;
  }

  return `${row}${column}`;
}

const controller = {
  guesses: 0,

  processGuess(guess) {
    const location = parseGuess(guess);
    if (location) {
      this.guesses++;
      const hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage(
          `You sank all my battleships, in ${this.guesses} guesses`
        );
      }
    }
  },
};

function init() {
  document.getElementById("fireButton").onclick = handleFireButton;
  document.getElementById("guessInput").onkeydown = handleKeyPress;
  model.generateShipLocations();
}

function handleFireButton() {
  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value = "";
}

function handleKeyPress(e) {
  if (e.keyCode === 13) {
    document.getElementById("fireButton").onclick();
    return false;
  }
}

window.onload = init;
