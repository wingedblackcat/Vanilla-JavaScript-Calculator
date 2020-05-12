const updateScreen = (str) => {
	userCalc.textContent = str;
};

const showResult = () => {
	calcResult.textContent = currentCalc.result;
};

const buildOutput = (calcObject) => {
	if (calcObject.lastNum !== '' && calcObject.operator && calcObject.currentNum) { // if lastNum, operator and currentNum
		updateScreen(`${calcObject.lastNum} ${calcObject.operator} ${calcObject.currentNum}`);

	} else if (calcObject.lastNum !== '' && calcObject.operator && !calcObject.currentNum !== '') { // if lastNum and operator
		updateScreen(`${calcObject.lastNum} ${calcObject.operator}`);

	} else if (!calcObject.lastNum !== '' && !calcObject.operator && calcObject.currentNum) { // only if one number 
		updateScreen(`${calcObject.currentNum}`);

	} else { // if none
		updateScreen('');
	}
};
