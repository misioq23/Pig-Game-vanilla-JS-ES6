import { element, strings } from '../config';

/**
 * A hold & roll buttons view manager object.
 */
const buttonsView = {
	/**
	 * Method renders hold and roll buttons
	 * @returns {undefined}
	 */
	render() {
		const view = `
			<button class="btn ${strings.btnRoll}">Roll dice</button>
			<button class="btn ${strings.btnHold}">Hold</button>
		`;
		element.appWrapper.insertAdjacentHTML('afterbegin', view);
	},

	/**
	 * Method removes hold and roll buttons if they are in the DOM tree
	 * @returns {undefined}
	 */
	remove() {
		const btnArr = [...document.querySelectorAll(`.${strings.btnHold}, .${strings.btnRoll}`)];
		if (btnArr) btnArr.forEach(button => button.parentNode.removeChild(button));
	}
};

export default buttonsView;
