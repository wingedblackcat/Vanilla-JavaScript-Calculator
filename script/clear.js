const clearAll = () => {
	currentCalc.currentNum = '';
	currentCalc.lastNum = '';
	currentCalc.operator = '';
	currentCalc.result = 0;
};

const clearEntry = () => {
	if ((currentCalc.lastNum && currentCalc.operator && currentCalc.currentNum) || (!currentCalc.lastNum && !currentCalc.operator && currentCalc.currentNum)) {
		currentCalc.currentNum = '';
	} else if (currentCalc.lastNum && currentCalc.operator && !currentCalc.currentNum) {
		currentCalc.operator = '';
		currentCalc.currentNum = currentCalc.lastNum;
		currentCalc.lastNum = '';
	} else {
		currentCalc.result = 0;
	}
};

const clearLast = () => {
	if (currentCalc.currentNum) {
		currentCalc.currentNum = currentCalc.currentNum.substring(0, currentCalc.currentNum.length - 1);
	} else {
		currentCalc.operator = '';
		currentCalc.currentNum = currentCalc.lastNum;
		currentCalc.lastNum = '';
	}
};

const clearKeyHandler = (clearType) => {
	switch (clearType) {
		case 'CA':
		case 'Escape':
			clearAll();
			break;
		case 'CE':
		case 'Delete':
			clearEntry();
			break;
		case 'CL': 
		case 'Backspace':
			clearLast();
			break;
	}
	buildOutput(currentCalc);
	showResult();
};
