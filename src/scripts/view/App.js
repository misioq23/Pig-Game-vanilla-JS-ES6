const App = {
	render() {
		const view = `           
            <button class="btn btn--new">New game</button>
			<div class="game"></div>
            <input type="number" placeholder="Final score: 100" class="final-score">
        `;
		return view;
	},
	afterRender: () => ({
		btnNew: document.querySelector('.btn--new'),
		finalScore: document.querySelector('.final-score'),
		game: document.querySelector('.game'),
	})
};

export default App;
