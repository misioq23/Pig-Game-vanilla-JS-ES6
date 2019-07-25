import { strings } from '../config';

const App = {
	render() {
		const view = `           
            <button class="btn ${strings.btnNew}">New game</button>
			<div class="${strings.playerList}"></div>
			<label class="${strings.finalLabel}" for="finalScore">Final Score</label>
            <input class="${strings.finalInput}" value="100" name="finalScore" type="number">
        `;
		return view;
	},
	afterRender: () => ({
		btnNew: document.querySelector(`.${strings.btnNew}`),
		finalScore: document.querySelector(`.${strings.finalInput}`),
		game: document.querySelector(`.${strings.playerList}`),
	})
};

export default App;
