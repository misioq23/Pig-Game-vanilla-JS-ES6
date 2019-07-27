import { element, strings } from '../config';

/**
 * A player object view manager
 * @param {object} playersModel object with players array
 */
class PlayersView {
	constructor({ players }) {
		this.players = players;
	}
	/**
	 * Method render players' interface
	 * @returns {undefined} returns nothing
	 */
	render() {
		const template = this.players.map(player => `
			<div id="${player.id}" class="player ${ !player.isActive || strings.playerActive }">
				<div class="player__name">${player.name}</div>
				<div class="player__score">${player.score}</div>
				<div class="player__current-box">
					<div class="player__current-label">Current</div>
					<div class="player__current-score">${player.currentScore}</div>
				</div>
			</div>`).join(' ');
		element.playersWrapper.innerHTML = template;
		this.players.forEach(player => this[player.id] = document.getElementById(player.id));
	}

	/**
	 * Method re-renders player's current score
	 * @param {object} player Active Player's object
	 * @returns {undefined} returns nothing
	 */
	showCurrentScore(player) {
		this[player.id].querySelector('.player__current-score').textContent = player.currentScore;
	}

	/**
	 * Method re-renders score and current score
	 * @param {object} player Active Player's object
	 * @returns {undefined} returns nothing
	 */
	showScore(player) {
		this[player.id].querySelector('.player__score').textContent = player.score;
		this.showCurrentScore(player);
	}

	/**
	 * Method toggles players's active class
	 * @returns {undefined} returns nothing
	 */
	toggleActive() {
		this.players.forEach(player => this[player.id].classList.toggle(strings.playerActive));
	}

	/**
	 * Method adds to player- winner class and changes name to winner
	 * @param {string} playerID Player's ID
	 * @returns {undefined} returns nothing
	 */
	showWinner(playerID) {
		this[playerID].className = `player ${strings.playerWinner}`;
		this[playerID].querySelector('.player__name').textContent = 'WINNER!';
	}
};

export default PlayersView;
