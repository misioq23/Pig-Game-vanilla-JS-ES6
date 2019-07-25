import { element } from '../config';
import { randomNumber } from '../utils/utils';
import Player from '../view/Player';
import Dice from '../view/Dice';
import NewGame from '../view/NewGame';

const gameModel = () => {
	const data = {
		activePlayer: false,
		maxScore: parseInt(element.finalScore.value, 10),
		names: ['Player 1', 'Player 2'],
	};

	// Clears app GUI
	element.game.innerHTML = '';

	// Prints main game interface
	const gameInterface = NewGame.render();
	element.game.insertAdjacentHTML('afterbegin', gameInterface);

	// Adds selectors to elements object
	const gameElements = NewGame.afterRender();
	Object.assign(element, gameElements);

	// Adds players and prints their GUI
	const players = [];
	data.names.forEach((name, index) => {
		players[index] = new Player(name, index === 0 ? true : false);
		players[index].showPlayer();
	});

	function changePlayer() {
		players.forEach(el => el.toggleActive());
		data.activePlayer = !data.activePlayer;
	}

	const rollDice = () => {
		const activePlayer = players[+data.activePlayer];
		const dice = [];
		// removes dices from view
		Dice.clear();

		// rolls random numbers
		function rollDices(number) {
			--number;
			if (number >= 0) {
				dice[number] = randomNumber();
				Dice.render(dice[number], number + 1);
				return rollDices(number);
			}
		}
		rollDices(2);

		 // If any 1 didn't fall out- Add dice numbers to current score otherwise reset current score
		 activePlayer.showCurrentScore(!dice.includes(1) ? dice.reduce((a, b) => a + b, 0) : 0);
		 // If only 1 fell out- Change player
		 if (dice.join('') !== '11' && dice.includes(1)) changePlayer();
	};

	const holdScore = () => {
		const activePlayer = players[+data.activePlayer];
		// prevent accidentaly changing players
		if (activePlayer.currentScore > 0) {
			activePlayer.showScore();
			Dice.clear();
			// checks if the player has won
			if (activePlayer.score >= data.maxScore) {
				activePlayer.win();
				// Removes dice and hold buttons from DOM
				element.btnRoll.parentNode.removeChild(element.btnRoll);
				element.btnHold.parentNode.removeChild(element.btnHold);
			} else {
				changePlayer();
			}
		}
	};

	// Event listeners for main buttons
	element.btnRoll.addEventListener('click', rollDice);
	element.btnHold.addEventListener('click', holdScore);
};

export default gameModel;
