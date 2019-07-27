import Player from './Player';

/**
 * A players' data object
 * @param {array<strings>} nameArr array with players' names
 */
class PlayersModel {
	constructor(nameArr) {
		this.players = nameArr.map((name, index) => new Player(name, index === 0));
		this.activePlayer = this.players[0];
	}
	/**
	 * Method iterates on players array and toggles objects' isActive properties and also changes this.activePlayer
	 * @returns {undefined} returns nothing
	 */
	changePlayer() {
		this.players.forEach(player => {
			player.isActive = !player.isActive;
			if (player.isActive) this.activePlayer =  player;
		});
	}
}

export default PlayersModel;
