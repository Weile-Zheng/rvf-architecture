const { spawn } = require("child_process");

/**
 * Called from server route: /process
 * @param imageLink Link of user uploaded image.
 * /-------- Note
 * The image uploaded by user through the third-party widget provider
 * will be stored and a link with the provider's domain will be supplied. Use
 * that link to fetch the user image. Input the link as a parameter to the
 * python script for proper analyzation.
 */
function runEvaluate(imageLink) {
	return new Promise((resolve, reject) => {
		const pyVersion = "python3";
		const pyPath = "evaluate.py";
		// Set current working directory to be in that of the python script
		const python = spawn(pyVersion, [pyPath, imageLink], { cwd: "./python" });

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
