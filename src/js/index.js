import { element } from './config';
import GameController from './controller/GameController';
import PlayersModel from './model/PlayersModel';
import DicesModel from './model/DicesModel';
import PlayersView from './view/PlayersView';
import DicesView from './view/DicesView';
import ButtonsView from './view/ButtonsView';

const init = () => {
	const nameArray = ['Player 1', 'Player 2'];

	const players = new PlayersModel(nameArray);
	const maxScore = parseInt(element.finalScore.value, 10);

	const newGame = new GameController(players, new DicesModel(), new PlayersView(players), new DicesView(), new ButtonsView(), maxScore);
	newGame.init();
};

element.btnNew.addEventListener('click', init);
