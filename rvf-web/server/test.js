const runEvaluate = require("./pyscript");

const message = async () => await runEvaluate();

const printMessage = async () => {
	const result = await message();
	console.log(result);
};

printMessage();
