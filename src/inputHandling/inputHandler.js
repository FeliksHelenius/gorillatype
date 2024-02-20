//imports
import MainHook from '../hooks/MainHook.js';

export default function inputHandler(e) {
	let mainHook = MainHook();
	if (!mainHook) return;
	mainHook.checkLetter(e);
	mainHook.updateCaret();
}
