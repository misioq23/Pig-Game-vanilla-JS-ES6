import { randomNumber } from '../utils/utils';

/**
 * A dices' model object
 * @param {number} dicesCount amount of numbers to draw
 */
class DicesModel {
	constructor(dicesCount) {
		this.numbers = [];
		this.dicesCount = dicesCount;
		this.iterator = 0;
	}
	/**
	 * Method draws the given amount of numbers and assigns it to this.numbers array.
	 * @returns {array} A new array with values same as in this.numbers
	 */
	roll() {
		this.numbers[this.iterator++] = randomNumber();
		if (this.iterator < this.dicesCount) return this.roll();
		this.iterator = 0;
		return [...this.numbers];
	}
};

export default DicesModel;
