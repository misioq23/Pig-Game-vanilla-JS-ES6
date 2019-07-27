import { element } from './config';
import GameController from './controller/GameController';
import PlayersModel from './model/PlayersModel';
import DicesModel from './model/DicesModel';
import PlayersView from './view/PlayersView';
import DicesView from './view/DicesView';
import ButtonsView from './view/ButtonsView';

const newGame = {
	nameArray: ['Player 1', 'Player 2'],
	players: {},
	activeGame: {},
	maxScore: 0,

	init() {
		this.players = new PlayersModel(this.nameArray);
		this.maxScore = parseInt(element.finalScore.value, 10);

		this.activeGame = new GameController(this.players, new DicesModel(), new PlayersView(this.players), new DicesView(), new ButtonsView(), this.maxScore);
		this.activeGame.init();
	}
};

element.appWrapper.addEventListener('click', e => {
	const clicked = e.target;
	if (clicked.classList.contains('btn--new')) newGame.init();
	if (clicked.classList.contains('btn--roll')) newGame.activeGame.rollDice();
	if (clicked.classList.contains('btn--hold')) newGame.activeGame.holdScore();
});
