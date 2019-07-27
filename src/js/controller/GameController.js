/**
 * A game's main controller
 * @param {object} playersModel players model object
 * @param {object} diceModel dice model object
 * @param {object} playersView players view object
 * @param {object} diceView dices view object
 * @param {object} buttonsView hold and roll buttons view object
 * @param {number} maxScore the minimum score needed to win
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
	 * Method inits newGame, resets GUI, binds methods for roll and hold buttons and renders them
	 * @returns {undefined} inits game
	 */
	init() {
		// removes hold and roll buttons and dices as well
		this.buttonsView.remove();
		this.diceView.remove();
		// renders player's interface
		this.playersView.render();
		// binds methods to buttons
		this.buttonsView.onClickRollDice = this.rollDice.bind(this);
		this.buttonsView.onClickHoldScore = this.holdScore.bind(this);
		// renders buttons with event listeners
		this.buttonsView.render();
	}
	/**
	 * Helper method to change player
	 * @returns {undefined} returns nothing
	 */
	changePlayer() {
		this.players.changePlayer();
		this.playersView.toggleActive();
	}
	/**
	 * method invoked by roll btn. Draws random numbers, pass it to player's object and if there's one its changes player
	 * @returns {undefined} returns nothing
	 */
	rollDice() {
		// draws random numbers
		this.dices.roll(2);
		this.diceView.render(this.dices.numbers);

		// update player's current score
		this.players.activePlayer.setCurrentScore(this.dices.numbers);
		this.playersView.showCurrentScore(this.players.activePlayer);

		// if dropped only one 1 changes player
		if (this.dices.numbers.join('') !== '11' && this.dices.numbers.includes(1)) this.changePlayer();
	}
	/**
	 * method invoked by hold btn. Adds active player's currentScore to score and changes player. It also checks whether the player is winner or not.
	 * @returns {undefined} returns nothing
	 */
	holdScore() {
		const player = this.players.activePlayer;
		// prevents clicking button if currentScore is 0 or game is over
		if (player.score < this.maxScore && player.currentScore > 0) {
			player.setScore();
			this.playersView.showScore(player);
			this.diceView.remove();
			// checks whether the player is winner
			if (player.score >= this.maxScore) {
				this.playersView.showWinner(player.id);
				this.buttonsView.remove();
			} else {
				this.changePlayer();
			}
		}
	}
}

export default GameController;
