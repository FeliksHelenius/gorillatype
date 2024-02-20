let _Settings = {
	wordsToGenerate: 10,
};

function updateSettings(wordsToGenerate) {
	_Settings.wordsToGenerate = wordsToGenerate;
	console.log('Words to generate =', _Settings.wordsToGenerate);
}

export default function Settings() {
	return [_Settings, updateSettings];
}
