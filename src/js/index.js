import { element, strings } from './config';
import GameController from './controller/GameController';
import PlayersModel from './model/PlayersModel';
import DicesModel from './model/DicesModel';
import playersView from './view/playersView';
import dicesView from './view/dicesView';
import buttonsView from './view/buttonsView';

/**
 * A main game's object
 */
const newGame = {
	nameArray: ['Player 1', 'Player 2'],
	players: {},
	dices: {},
	activeGame: {},
	maxScore: 0,

	/**
	 * Method assigns new data, injects that data to game controller and initialise game.
	 * @returns {undefined}
	 */
	init() {
		this.players = new PlayersModel(this.nameArray);
		this.dices = new DicesModel(2);
		this.maxScore = parseInt(element.finalScore.value, 10);

		this.activeGame = new GameController(this.players, this.dices, playersView, dicesView, buttonsView, this.maxScore);
		this.activeGame.init();
	}
};

element.appWrapper.addEventListener('click', e => {
	const clicked = e.target;
	if (clicked.classList.contains('btn--new')) newGame.init();
	if (clicked.classList.contains(`${strings.btnRoll}`)) newGame.activeGame.rollDice();
	if (clicked.classList.contains(`${strings.btnHold}`)) newGame.activeGame.holdScore();
});
