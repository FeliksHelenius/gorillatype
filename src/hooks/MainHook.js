import Words from '../generateWords/generateWords.js';
import playSound from '../typingSounds/playSound.js';

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
				letterHtmlElement.classList.length == 1 // if the classList only has 'letter' and not an 'incorrect' in it
					? letterHtmlElement.classList.add('correct')
					: letterHtmlElement.classList.replace('incorrect', 'correct'); //if the classList has a 'letter' and an 'incorrect' in it
			} else {
				// if the typed letter doesn't match
				letterHtmlElement.classList.length == 1
					? letterHtmlElement.classList.add('incorrect')
					: letterHtmlElement.classList.replace('correct', 'incorrect');
			}
		}

		//handling backspaces
		if (letter.keyCode == backspace) {
			//playsound
			playSound('backspace');
			console.log('pressed backspace!');
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
			console.log('pressed spacebar!');

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
			console.log('the user is on the last word');
			//2. check if the user has reached the last letter of the last word
			if (this.typedLetters.length == this.activeWord.length) {
				console.log('the user has finished writing the word');
				this.finishedGame();
			}
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
		console.log(
			`Updating current activeWord: (${this.activeWord}), to ${activeWord} and current activeWordIndex: (${this.activeWordIndex}), to ${activeWordIndex}`
		);
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
		console.log('game finished!');
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
	}

	//all the other funny things
}

//variables
let mainHook = false;
let timer;
let secondsCounter = 0;
let minutesCounter = 0;

function initializeMainHook(wordsObject) {
	mainHook = new _MainHook(wordsObject);
	let wpm = 0;
	timer = setInterval(() => {
		secondsCounter += 0.01;

		wpm =
			(mainHook.typedWords.join(' ').length + mainHook.typedLetters.length) /
			5 /
			(secondsCounter / 60);

		wpmElem.textContent = wpm | 0;
	}, 10);
}

function destroyMainHook() {
	mainHook = false;
	clearInterval(timer);
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
		console.log('resetting');
		mainHook.finishedGame();
		let wordsObject = Words();
		initializeMainHook(wordsObject);
		gameContainer.focus();
	}

	return mainHook;
}
