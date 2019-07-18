const element = {
	wrapper: document.querySelector('.wrapper')
};

class Player {

	constructor(name, active = false) {
		this.name = name;
		this.active = active;
		this.score = 0;
		this.currentScore = 0;
	}

	createPlayer() {
		const template = `
			<div id="${this.name}" class="player ${ this.active ? 'player--active' : ' ' }">
				<div class="player__name">${this.name}</div>
				<div class="player__score">${this.score}</div>
				<div class="player__current-box">
					<div class="player__current-label">Current</div>
					<div class="player__current-score">${this.currentScore}</div>
				</div>
			</div>`;

		element.wrapper.insertAdjacentHTML('beforeend', template);

		this.DOMPlayer = document.querySelector(`#${this.name}`);
		this.DOMName = document.querySelector(`#${this.name} .player__name`);
		this.DOMCurrentScore = document.querySelector(`#${this.name} .player__current-score`);
		this.DOMScore = document.querySelector(`#${this.name} .player__score`);
	}

	printCurrent(count = 0) {
		!!count ? this.currentScore += count : this.currentScore = 0;
		this.DOMCurrentScore.textContent = this.currentScore;
	}

	printScore() {
		this.score += this.currentScore;
		this.DOMScore.textContent = this.score;
		this.currentScore = 0;
		this.printCurrent();
	}

	toggleActive() {
		this.DOMPlayer.classList.toggle('player--active');
	}

	win() {
		this.DOMPlayer.classList.add('player--winner');
		this.DOMPlayer.classList.remove('player--active');
		this.DOMName.textContent = 'WINNER!';
		element.btnRoll.disabled = true;
		element.btnHold.disabled = true;
	}
}

function createApp() {
	const markup = `           
	<button class="btn btn--new">New game</button>
	<button class="btn btn--roll">Roll dice</button>
	<button class="btn btn--hold">Hold</button>
	
	<input type="text" placeholder="Final score" class="final-score">
	
	<div class="dice__wrapper">
	</div>`;

	element.wrapper.insertAdjacentHTML('afterbegin', markup);

	element.btnNew = document.querySelector('.btn--new');
	element.btnRoll = document.querySelector('.btn--roll');
	element.btnHold = document.querySelector('.btn--hold');
	element.diceWrapper = document.querySelectorAll('.dice__wrapper');

	function newGame() {
		function clearApp() {
			element.wrapper.innerHTML = '';
		}

		function rollNum() {
			return Math.floor(Math.random() * 6) + 1;
		}
		const input = parseInt(document.querySelector('.final-score').value, 10);
		clearApp();
		createApp();

		const data = {};
		data.activePlayer = false;
		data.maxScore = input ? input : 1;
		data.player0 = new Player ('Misioq', true);
		data.player1 = new Player ('Asia');

		data.player0.createPlayer();
		data.player1.createPlayer();

		function changePlayer() {
			data.player0.toggleActive();
			data.player1.toggleActive();
			data.activePlayer = !data.activePlayer;
		}

		function clearDice() {
			document.querySelector('.dice__wrapper').innerHTML = '';
		}

		const rollDice = () => {
			const dice = [];
			const player = data[`player${+data.activePlayer}`];
			// rolls numbers
			clearDice();
			const markup = (number, index) => `<img src="assets/dice-${number}.svg" alt="Dice" class="dice" id="dice-${index}">`;
			for (let i = 0; i < 2; i++) {
				dice[i] = rollNum();
				document.querySelector('.dice__wrapper').insertAdjacentHTML('afterbegin', markup(dice[i], i + 1));
			}
			// checks result
			if (!dice.includes(1)) {
				// no one
				player.printCurrent(dice.reduce((a, b) => a + b, 0));
			} else if (dice.join('') === '11') {
				// two 1
				player.printCurrent();
			} else {
				// one 1
				player.printCurrent();
				changePlayer();
			}
		};

		const holdScore = () => {
			const player = data[`player${+data.activePlayer}`];
			if (player.currentScore > 0) {
				player.printScore();
				clearDice();
				// checks if the player has won
				if (player.score >= data.maxScore) player.win();
				else changePlayer();
			}
		};

		element.btnRoll.disabled = false;
		element.btnHold.disabled = false;
		element.btnRoll.addEventListener('click', rollDice);
		element.btnHold.addEventListener('click', holdScore);
	}
	element.btnNew.addEventListener('click', newGame);
}

createApp();
