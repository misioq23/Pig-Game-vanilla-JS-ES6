import { removeSpace } from '../utils/utils';

/**
 * A player's data object
 * @param {string} name player's nick
 * @param {boolean} isActive whether player isActive
 */
class Player {
	constructor(name, isActive) {
		this.id = removeSpace(name);
		this.name = name;
		this.score = 0;
		this.currentScore = 0;
		this.isActive = isActive;
	}
}

export default Player;
