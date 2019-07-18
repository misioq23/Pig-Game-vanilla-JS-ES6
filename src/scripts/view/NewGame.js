const NewGame = {
	render() {
		const view = `           
			<div class="dice__wrapper"></div>
            <button class="btn btn--roll">Roll dice</button>
            <button class="btn btn--hold">Hold</button>
        `;
		return view;
	},
	afterRender: () => ({
		btnRoll: document.querySelector('.btn--roll'),
		btnHold: document.querySelector('.btn--hold'),
		diceWrapper: document.querySelector('.dice__wrapper'),
	})
};

export default NewGame;
