import { randomNumber } from '../utils/utils';

/**
 * A dices' data object
 */
class DicesModel {
	constructor() {
		this.numbers = [];
	}
	/**
	 * Method draws the given number of numbers and assigns it to this.numbers array
	 * @param {number} number how many numbers method draws
	 * @returns {undefined} changes values of this.numbers array
	 */
	roll(number) {
		if (number > 0) {
			this.numbers[number - 1] = randomNumber();
			return this.roll(--number);
		}
	}
};

export default DicesModel;
