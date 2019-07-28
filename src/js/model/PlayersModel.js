import Player from './Player';

/**
 * A players' data object
 * @param {array<strings>} nameArr array with players' names
 */
class PlayersModel {
	constructor(nameArr) {
		this.players = nameArr.map((name, index) => new Player(name, index === 0));
		this.activePlayer = this.players[0];
	}
	/**
	 * Method toggles 'isActive' property in players' objects and also updates value of 'this.activePlayer'.
	 * @returns {undefined}
	 */
	changePlayer() {
		this.players.forEach(player => {
			player.isActive = !player.isActive;
			if (player.isActive) this.activePlayer = player;
		});
	}
	/**
	 * Method checks whether array contains 1. If not, adds the sum of the array values to current score of active player. Otherwise resets current score.
	 * @param {array<numbers>} numbersArr array with drawed numbers
	 * @returns {undefined}
	 */
	setCurrentScore(numbersArr) {
		this.activePlayer.currentScore += !numbersArr.includes(1) ? numbersArr.reduce((a, b) => a + b, 0) : -this.activePlayer.currentScore;
	}
	/**
	 * Method adds value of current score to total score of active player and resets current score.
	 * @returns {undefined}
	 */
	setScore() {
		this.activePlayer.score += this.activePlayer.currentScore;
		this.activePlayer.currentScore = 0;
	}
}

export default PlayersModel;
