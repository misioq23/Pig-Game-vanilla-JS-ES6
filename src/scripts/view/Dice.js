import { element } from '../config';

const Dice = ({
	render(number, index) {
		const view = `
			<img src="assets/dice-${number}.svg" alt="Dice" class="dice" id="dice-${index}">
		`;
		element.diceWrapper.insertAdjacentHTML('afterbegin', view);
	},
	clear() {
		element.diceWrapper.innerHTML = '';
	}
});

export default Dice;
