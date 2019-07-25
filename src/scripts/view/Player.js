import { element } from '../config';
import { removeSpace } from '../utils/utils';

class Player {

	constructor(name, active) {
		this.id = removeSpace(name);
		this.name = name;
		this.active = active;
		this.score = 0;
		this.currentScore = 0;
	}

	showPlayer() {
		const template = `
			<div id="${this.id}" class="player ${ this.active ? 'player--active' : ' ' }">
				<div class="player__name">${this.name}</div>
				<div class="player__score">${this.score}</div>
				<div class="player__current-box">
					<div class="player__current-label">Current</div>
					<div class="player__current-score">${this.currentScore}</div>
				</div>
			</div>`;
		element.game.insertAdjacentHTML('beforeend', template);

		this.DOMPlayer = document.querySelector(`#${this.id}`);
		this.DOMName = document.querySelector(`#${this.id} .player__name`);
		this.DOMCurrentScore = document.querySelector(`#${this.id} .player__current-score`);
		this.DOMScore = document.querySelector(`#${this.id} .player__score`);
	}

	showCurrentScore(count = 0) {
		this.currentScore += !!count ? count : -this.currentScore;
		this.DOMCurrentScore.textContent = this.currentScore;
	}

	showScore() {
		this.score += this.currentScore;
		this.DOMScore.textContent = this.score;
		this.currentScore = 0;
		this.showCurrentScore();
	}

	toggleActive() {
		this.DOMPlayer.classList.toggle('player--active');
	}

	win() {
		this.DOMPlayer.classList.add('player--winner');
		this.DOMPlayer.classList.remove('player--active');
		this.DOMName.textContent = 'WINNER!';
	}
}

export default Player;
