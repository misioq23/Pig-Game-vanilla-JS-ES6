import { element, strings } from '../config';

/**
 * A dice object view manager.
 */
class DicesView {

	/**
	 * Method renders dices based on passed array with random numbers
	 * @param {array} numberArr array with numbers to print
	 * @returns {undefined}
	 */
	render(numberArr) {
		this.remove();
		const view = numberArr.map((number, index) => `
			<img src="assets/dice-${number}.svg" alt="Dice" class="${strings.dice}" id="${strings.dice}-${index + 1}">
		`).join(' ');
		element.appWrapper.insertAdjacentHTML('afterbegin', view);
	}
	/**
	 * Method removes dices from wrapper
	 * @returns {undefined}
	 */
	remove() {
		const diceArr = [...document.querySelectorAll(`.${strings.dice}`)];
		if (diceArr) diceArr.forEach(dice => dice.parentNode.removeChild(dice));
	}
};

export default DicesView;
