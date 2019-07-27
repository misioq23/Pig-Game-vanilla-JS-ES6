import { removeSpace } from '../utils/utils';

/**
 * A player's data object
 * @param {string} name player's nick
 * @param {boolean} isActive whether player isActive
 */
class Player {
	constructor(name, isActive) {
		this.id = removeSpace(name);
		this.name = name;
		this.score = 0;
		this.currentScore = 0;
		this.isActive = isActive;
	}

	/**
	 * Method checks whether array includes 1 if not adds sum of values otherwise resets current score
	 * @param {array<numbers>} diceArr array with drawed numbers
	 * @returns {undefined} returns nothing
	 */
	setCurrentScore(diceArr) {
		this.currentScore += !diceArr.includes(1) ? diceArr.reduce((a, b) => a + b, 0) : -this.currentScore;
	}

	/**
	 * Method adds to total score value of current score and reset current score
	 * @returns {undefined} returns nothing
	 */
	setScore() {
		this.score += this.currentScore;
		this.currentScore = 0;
	}
}

export default Player;
