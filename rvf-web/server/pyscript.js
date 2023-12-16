const { rejects } = require("assert");
const { spawn } = require("child_process");

/**
 * Called from server route: /process
 */
function runEvaluate() {
	return new Promise((resolve, reject) => {
		const pyVersion = "python3";
		const pyPath = "./python/evaluate.py";
		const python = spawn(pyVersion, [pyPath]);

		let returnMessage = "";

		python.stdout.on("data", (data) => {
			returnMessage += data;
		});

		python.stderr.on("data", (data) => {
			reject(`stderr: ${data}`);
		});

		python.on("close", (code) => {
			if (code !== 0) {
				reject(`Child process exited with code: ${code}`);
			} else {
				resolve(returnMessage);
			}
		});
	});
}

module.exports = runEvaluate;
