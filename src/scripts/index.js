import App from './view/App';
import newGame from './model/NewGame';
import { element } from './config';

const createApp = () => {
	// Renders main page Markup
	const markup = App.render();
	element.wrapper.insertAdjacentHTML('afterbegin', markup);

	// Add elements to config
	const appElements = App.afterRender();
	Object.assign(element, appElements);

	// Listening for NewGame
	element.btnNew.addEventListener('click', newGame);
};

createApp();
