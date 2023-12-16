const express = require("express");
const router = express.Router();
const runEvaluate = require("../pyscript");

router.use(logger);

// root route of process
router
	.route("/")
	/**
	 * requests will send in a link on where uploaded image is stored.
	 * respond with real/fake classification result and gradCam.
	 */
	.post(async (req, res) => {
		try {
			const result = await runEvaluate();
			res.json({ result: result });
		} catch (error) {
			res.status(500).json({ error: "Error evaluting image" });
		}
	});

function logger(req, res, next) {
	console.log(req.originalUrl);
	next();
}

module.exports = router;
