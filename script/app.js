// ------------------------------------- VARIABLE DECLARATIONS --------------------------------------
// Getting the calculator buttons
const calcKeys = document.querySelectorAll('.btn');

// Getting the calculator screen elements
const userCalc = document.getElementById('user-input');
const calcResult = document.getElementById('result');

// Getting the calculator app control buttons
const historyPanel = document.getElementById('history-log');

// General 'State' variables
let equalsFlag = false;
let historyLog = [];
let currentCalc = {
	lastNum: '',
	currentNum: '',
	operator: '',
	result: 0,
};

// Some predefined constants
const NUMBER_KEY_INPUT = 'number';
const ACTION_KEY_INPUT = 'action';
const MEMORY_KEY_INPUT = 'memory';

const EQUALS_KEYS = ['equals', 'Enter'];
const OPERATOR_KEYS = ['+', '-', '*', '/'];
const CLEAR_KEYS = ['CA', 'CE', 'CL', 'Backspace', 'Delete', 'Escape'];
const UNARY_KEYS = ['mul-inverse', 'pow', 'root', 'pos-neg', '.', '%'];

const KEYBOARD_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Backspace', 'Delete', 'Escape', 'Enter'];

// ------------------------------------- FUNCTIONS --------------------------------------
const writeToLog = (calcObject) => {
	historyLog.push(JSON.parse(calcObject));
};

const equalKeyHandler = () => {
	if (currentCalc.lastNum !== '' && currentCalc.operator && currentCalc.currentNum !== '') {
		equalsFlag = true;
		currentCalc.result = getResult(currentCalc);
		writeToLog(JSON.stringify(currentCalc));
	}
	showResult();
};

const getResult = (calcObject) => {
	return calculationHandler(calcObject);
};

const numberKeyHandler = (num) => {
	if (equalsFlag) {
		equalsFlag = false;
		clearKeyHandler('CA');
	}
	currentCalc.currentNum += num;
	buildOutput(currentCalc);
};

const operatorHandler = (operatorSign) => {
	equalsFlag = false;
	if (!currentCalc.lastNum && !currentCalc.operator && currentCalc.currentNum) {
		currentCalc.operator = operatorSign;
		currentCalc.lastNum = currentCalc.currentNum;
		currentCalc.currentNum = '';
	} else {
		if (!currentCalc.currentNum) {
			currentCalc.operator = operatorSign;
		} else {
			currentCalc.lastNum = historyLog[historyLog.length - 1].result.toString();
			currentCalc.operator = operatorSign;
			currentCalc.currentNum = '';
			currentCalc.result = 0;
			showResult();
		}
	}
	buildOutput(currentCalc);
};

// const unaryKeyHandler = (btnValue) => {
// 	equalsKeyPressed = false;
// 	if (currentNum && !operator){
// 		currentNum = unaryCalculations(btnValue);
// 		showResult(currentNum);
// 	}
// 	buildOutput();
// };

const actionKeyHandler = (btnValue) => {
	if (OPERATOR_KEYS.includes(btnValue)) {
		operatorHandler(btnValue);
	} else if (EQUALS_KEYS.includes(btnValue)) {
		equalKeyHandler();
	} else if (CLEAR_KEYS.includes(btnValue)) {
		clearKeyHandler(btnValue);
	} else if (UNARY_KEYS.includes(btnValue)) {
		console.log(btnValue);
		// unaryKeyHandler(btnValue);
	}
};

const getInput = (e, inputSource = 'mouse') => {
	let btnValue = '';
	let btnType = '';
	if (inputSource === 'mouse') {
		btnValue = e.target.value;
		btnType = e.target.getAttribute('data-type');
	} else if (inputSource === 'keyboard') {
		btnValue = e.key;
		btnType = /[0-9]/.test(btnValue) ? NUMBER_KEY_INPUT : ACTION_KEY_INPUT;
	}

	switch (btnType) {
		case NUMBER_KEY_INPUT:
			numberKeyHandler(btnValue);
			break;
		case ACTION_KEY_INPUT:
			actionKeyHandler(btnValue);
			break;
		case MEMORY_KEY_INPUT:
			console.log(btnValue);
			break;
	}
};

// Event Listeners
for (const calcKey of calcKeys) {
	calcKey.addEventListener('click', getInput);
}

historyPanel.addEventListener('click', () => {
	console.log(historyLog);
});

document.addEventListener('keydown', (e) => {
	if (KEYBOARD_KEYS.includes(e.key)) {
		getInput(e, 'keyboard');
	}
});
