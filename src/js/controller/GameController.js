/**
 * A game's controller. Here is located main app's logic.
 * @param {object} playersModel data model with players' objects array
 * @param {object} diceModel data model to draw numbers for dices and store them in array
 * @param {object} playersView object literal with methods to render and changes players GUI
 * @param {object} diceView object literal with methods to render and remove dices
 * @param {object} buttonsView object literal with methods to render and remove btns roll and hold
 * @param {number} maxScore minimum score necessary to win
 */
class GameController {
	constructor(playersModel, diceModel, playersView, diceView, buttonsView, maxScore) {
		this.players = playersModel;
		this.playersView = playersView;
		this.dices = diceModel;
		this.diceView = diceView;
		this.buttonsView = buttonsView;
		this.maxScore = maxScore;
	}
	/**
	 * Method inits new game: firstly resets GUI, next renders players and buttons.
	 * @returns {undefined}
	 */
	init() {
		// removes hold and roll buttons and dices as well
		this.buttonsView.remove();
		this.diceView.remove();
		// renders player's interface
		this.playersView.render(this.players.players);
		// renders buttons with event listeners
		this.buttonsView.render();
	}
	/**
	 * Changes active player.
	 * @returns {undefined}
	 */
	changePlayer() {
		this.players.changePlayer();
		this.playersView.toggleActive(this.players.players);
	}
	/**
	 * Manages passing array with drawed number to player's object.
	 * It also will change active player if one of a dice is 1
	 * @returns {undefined}
	 */
	rollDice() {
		const { numbers } = this.dices;
		const { activePlayer } = this.players;
		// draws random numbers and renders them
		this.dices.roll();
		this.diceView.render(numbers);

		// updates player's current score
		this.players.setCurrentScore(numbers);
		this.playersView.showCurrentScore(activePlayer);

		// if one of a numbers is 1, changes player
		if (numbers.includes(1) && numbers.join('') !== '11') this.changePlayer();
	}
	/**
	 * Manages passing active player's currentScore to its total score and then changes active player.
	 * It also will end game if player's score is greater or equals maxScore.
	 * @returns {undefined}
	 */
	holdScore() {
		const { activePlayer } = this.players;
		// prevents clicking button if currentScore is 0 or game is over
		if (activePlayer.score < this.maxScore && activePlayer.currentScore > 0) {
			this.players.setScore();
			this.playersView.showScore(activePlayer);
			this.diceView.remove();
			// checks whether the active player is winner
			if (activePlayer.score >= this.maxScore) {
				this.playersView.showWinner(activePlayer.id);
				this.buttonsView.remove();
			} else {
				this.changePlayer();
			}
		}
	}
}

export default GameController;
