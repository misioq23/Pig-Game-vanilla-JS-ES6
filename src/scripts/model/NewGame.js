import { element } from '../config';
import Player from '../view/Player';
import Dice from '../view/Dice';
import NewGame from '../view/NewGame';
const newGame = () => {
	const data = {
		activePlayer: 0,
		maxScore: parseInt(element.finalScore.value, 10),
		names: ['Player 1', 'Player 2']
	};
	// Clears app GUI
	element.game.innerHTML = '';
	// Prints main game interface
	const markup = NewGame.render();
	element.game.insertAdjacentHTML('afterbegin', markup);
	// Adds selectors to elements object
	const appElements = NewGame.afterRender();
	Object.assign(element, appElements);
	// Adds players and prints their GUI
	data.names.forEach((el, i) => {
		data[i] = new Player(el, i === 0 ? true : false);
		data[i].showPlayer();
	});

	function changePlayer() {
		data[data.activePlayer].toggleActive();
		data.activePlayer === data.names.length - 1 ? data.activePlayer = 0 : data.activePlayer++;
		data[data.activePlayer].toggleActive();
	}

	const rollDice = () => {
		const rollNum = () => Math.floor(Math.random() * 6) + 1;
		const dice = [];
		// rolls numbers
		Dice.clear();

		for (let i = 0; i < 2; i++) {
			dice[i] = rollNum();
			Dice.render(dice[i], i + 1);
		}
		// checks result
		if (!dice.includes(1)) {
			// no 'one'
			data[data.activePlayer].showCurrentScore(dice.reduce((a, b) => a + b, 0));
		} else if (dice.join('') === '11') {
			// two 'ones'
			data[data.activePlayer].showCurrentScore();
		} else {
			// one 'one'
			data[data.activePlayer].showCurrentScore();
			changePlayer();
		}
	};

	const holdScore = () => {
		// prevent accidentaly changing players
		if (data[data.activePlayer].currentScore > 0) {
			data[data.activePlayer].showScore();
			Dice.clear();
			// checks if the player has won
			if (data[data.activePlayer].score >= data.maxScore) {
				data[data.activePlayer].win();
				element.btnRoll.disabled = true;
				element.btnHold.disabled = true;
			} else {
				changePlayer();
			}
		}
	};
	// Event listeners for main buttons
	element.btnNew.addEventListener('click', newGame);
	element.btnRoll.addEventListener('click', rollDice);
	element.btnHold.addEventListener('click', holdScore);
};

export default newGame;
