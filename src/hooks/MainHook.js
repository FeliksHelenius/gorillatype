import Words from '../generateWords/generateWords.js';
import playSound from '../typingSounds/playSound.js';
import spawnRocket from '../spawnRocket/spawnRocket.js';
import Monster from '../monster/monster.js';

const gameContainer = document.querySelector('#game-container');
const caret = document.querySelector('#caret');
const caretCoordinates = { x: 0, y: 0 };
const wpmElem = document.querySelector('#wpm');

class _MainHook {
	wordsObject;
	typedLetters = [];
	typingIndex;
	activeWord;
	activeWordIndex;
	typedWords = []; // all the words the user has typed.
	wordHtmlElements = []; // parents of the letters.
	doneTyping = false;
	letterHtmlElements = [];
	//timer thingies wpm n shi
	timer = false;
	secondsCounter = 0;
	minutesCounter = 0;
	wpm = 0;
	mistakes = 0;

	constructor(wordsObject) {
		this.wordsObject = wordsObject;
		this.activeWord = wordsObject[`word${0}`];
		this.activeWordIndex = 0;
		this.typingIndex = 0;
		this.createWordHtmlElements();
	}

	checkLetter(letter) {
		//valid keys
		const backspace = 8; //keyCode 8
		const whitespace = 32; //keyCode 32
		const key = letter.key;
		//handling all keys from [a-zA-z]
		if (letter.keyCode >= 65 && letter.keyCode <= 90) {
			//playsound
			playSound('normal');

			//1. push letter to array if the typed letters are less than the active word

			if (this.typedLetters.length < this.activeWord.length) {
				this.typedLetters.push(key);
			}

			//update typingindex
			this.updateTypingIndex();

			const letterHtmlElement =
				this.wordHtmlElements[this.activeWordIndex].childNodes[
					this.typingIndex
				];

			//3. update html and styles
			if (
				this.typedLetters[this.typingIndex] == this.activeWord[this.typingIndex] // if the typed letter matches the activeWord's expected letter
			) {
				if (letterHtmlElement.classList.length == 1)
					spawnRocket(letterHtmlElement);
				letterHtmlElement.classList.length == 1 // if the classList only has 'letter' and not an 'incorrect' in it
					? letterHtmlElement.classList.add('correct')
					: letterHtmlElement.classList.replace('incorrect', 'correct'); //if the classList has a 'letter' and an 'incorrect' in it

				if (letterHtmlElement.classList.length > 1) {
					this.mistakes = this.mistakes - 1;
				}
			} else {
				// if the typed letter doesn't match
				letterHtmlElement.classList.length == 1
					? letterHtmlElement.classList.add('incorrect')
					: letterHtmlElement.classList.replace('correct', 'incorrect');
			}

			this.mistakes = this.mistakes + 1;
		}

		//handling backspaces
		if (letter.keyCode == backspace) {
			//playsound
			playSound('backspace');

			//update typingindex
			this.updateTypingIndex();

			const letterHtmlElement =
				this.wordHtmlElements[this.activeWordIndex].childNodes[
					this.typingIndex
				];

			letterHtmlElement.className = 'letter';

			this.typedLetters.pop();
		}

		//handling whitespaces
		if (letter.keyCode == whitespace) {
			//playsound
			playSound('spacebar');

			//user has reached the end of a word
			if (this.typedLetters.length == this.activeWord.length) {
				this.typedWords.push(this.wordsObject[`word${this.activeWordIndex}`]); //adding the finsihed word to the array
				this.updateActive(
					this.wordsObject[`word${this.activeWordIndex + 1}`],
					this.activeWordIndex + 1
				);
				const letterHtmlElement =
					this.wordHtmlElements[this.activeWordIndex].childNodes[
						this.typingIndex
					];
			}
		}

		//the user has reached the end of the game

		//1. check if the user is on the last word
		if (this.activeWordIndex + 1 == Object.entries(this.wordsObject).length) {
			//2. check if the user has reached the last letter of the last word
			if (this.typedLetters.length == this.activeWord.length) {
				this.finishedGame();
			}
		}

		//starting and stopping timer
		if (this.activeWordIndex == 0 && this.typingIndex == 0) {
			this.startTimer();
		}
	}
	updateTypingIndex() {
		if (this.typedLetters.length == 0) {
			this.typingIndex = 0;
		} else if (this.typedLetters.length <= this.activeWord.length) {
			this.typingIndex = this.typedLetters.length - 1;
		}
	}
	updateActive(activeWord, activeWordIndex) {
		this.typedLetters = [];

		this.activeWord = activeWord;
		this.activeWordIndex = activeWordIndex;
		this.typingIndex = 0;
	}

	createWordHtmlElements() {
		//creating the elements

		Object.keys(this.wordsObject).map((v, i) => {
			let word = this.wordsObject[v];
			let wordHtmlELement = document.createElement('div');
			wordHtmlELement.classList.add('word');

			//creating letters
			Array.from(word).forEach((letter) => {
				let letterHtmlElement = document.createElement('span');
				letterHtmlElement.textContent = letter;
				letterHtmlElement.classList.add('letter');
				letterHtmlElement.dataset.letter = letter;
				wordHtmlELement.appendChild(letterHtmlElement);
				this.letterHtmlElements.push(letterHtmlElement);
			});

			//updating this.wordHtmlElements
			this.wordHtmlElements.push(wordHtmlELement);

			//appending to parent
			gameContainer.appendChild(wordHtmlELement);
		});
		caret.style.display = 'block';
		this.updateCaret();
	}

	updateCaret() {
		let currentElem =
			this.wordHtmlElements[this.activeWordIndex].childNodes[this.typingIndex];

		let newCoordinates = {
			x: currentElem.offsetLeft,
			y: currentElem.offsetTop,
		};

		caretCoordinates.x = newCoordinates.x;
		caretCoordinates.y = newCoordinates.y;

		let caretTranslate = `translate(${caretCoordinates.x}px, ${
			caretCoordinates.y + caret.clientHeight / 3
		}px)`;

		caret.style.transform = `${caretTranslate}`;
	}

	//when the player has typed all the available words
	finishedGame() {
		let monster = Monster('get');
		destroyMainHook();
		caret.style.display = 'none';
		Array.from(this.wordHtmlElements).forEach((elem) => {
			// setTimeout(() => {
			// 	elem.remove();
			// }, 1000);
			elem.remove();
		});
		gameContainer.blur();
		this.doneTyping = true;
		this.mistakes = 0;
		this.stopTimer();
		if (!monster) return;
		monster.respawnMonster(true);
	}

	startTimer() {
		if (this.timer) return;

		this.timer = setInterval(() => {
			this.secondsCounter = this.secondsCounter + 0.1;
			this.wpm =
				(this.typedWords.join(' ').length +
					this.typedLetters.length -
					this.mistakes) /
				5 /
				(this.secondsCounter / 60);

			wpmElem.textContent = Math.round(this.wpm);
		}, 100);
	}
	stopTimer() {
		clearInterval(this.timer);
		this.timer = false;
		this.secondsCounter = 0;
		this.minutesCounter = 0;
	}

	//all the other funny things
}

//variables
let mainHook = false;

function initializeMainHook(wordsObject) {
	mainHook = new _MainHook(wordsObject);
}

function destroyMainHook() {
	mainHook = false;
}

export default function MainHook(wordsObject = mainHook.wordsObject) {
	if (!mainHook) {
		if (wordsObject == undefined) {
			let wordsObject = Words();
			initializeMainHook(wordsObject);
		} else {
			initializeMainHook(wordsObject);
		}
	}

	if (wordsObject == 'reset') {
		mainHook.finishedGame();
		let wordsObject = Words();
		initializeMainHook(wordsObject);
		gameContainer.focus();
	}

	return mainHook;
}
