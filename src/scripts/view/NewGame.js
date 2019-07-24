import { strings } from '../config';

const NewGame = {
	render() {
		const view = `           
			<div class="${strings.diceWrapper}"></div>
            <button class="btn ${strings.btnRoll}">Roll dice</button>
            <button class="btn ${strings.btnHold}">Hold</button>
        `;
		return view;
	},
	afterRender: () => ({
		btnRoll: document.querySelector(`.${strings.btnRoll}`),
		btnHold: document.querySelector(`.${strings.btnHold}`),
		diceWrapper: document.querySelector(`.${strings.diceWrapper}`),
	})
};

export default NewGame;
