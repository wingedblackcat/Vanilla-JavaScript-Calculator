const add = (a, b) => Number(a) + Number(b);

const sub = (a, b) => Number(a) - Number(b);

const mul = (a, b) => Number(a) * Number(b);

const div = (a, b) => {
	return Number((Number(a) / Number(b)).toFixed(4));
};

const pow = (a, b = 2) => Number(Math.pow(Number(a), b)).toFixed(4);

const root = (a) => Number(Math.sqrt(Number(a)).toFixed(4));

const posNeg = (a) => Number(a) * -1;

const mulInverse = (a) => Number(1 / Number(a)).toFixed(4);

const calculationHandler = (calcObject) => {
	let result;
	switch (calcObject.operator) {
		case '+':
			result = add(calcObject.lastNum, calcObject.currentNum);
			break;
		case '-':
			result = sub(calcObject.lastNum, calcObject.currentNum);
			break;
		case '*':
			result = mul(calcObject.lastNum, calcObject.currentNum);
			break;
		case '/':
			result = div(calcObject.lastNum, calcObject.currentNum);
			break;
	}
	return result;
};

const unaryCalculations = (unaryKey) => {
	let result;
	switch (unaryKey) {
		case 'pow':
			result = pow(currentNum);
			break;
		case 'root':
			result = root(currentNum);
			break;
		case 'pos-neg':
			result = posNeg(currentNum);
			break;
		case 'mul-inverse':
			result = mulInverse(currentNum);
			break;
	}
	return result;
};
