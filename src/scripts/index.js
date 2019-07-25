import gameController from './controller/gameController';
import { element } from './config';

const createApp = () => {
	// Listening for gameController
	element.btnNew.addEventListener('click', gameController);
};

createApp();
