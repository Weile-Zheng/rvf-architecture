const express = require("express");
const router = express.Router();
const runEvaluate = require("../pyscript");
const crypto = require("crypto");

// TODO: change after deployment
const serverUrl = "http://localhost:4000";

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
			// Get incoming user uploaded image link
			const imageFileLink = req.body.fileUrls;

			// Session ID
			const sessionID = crypto.randomBytes(3).toString("hex");

			// Gradcam images served under /gradcam/grad<sessionID>
			const gradCamPath = `${serverUrl}/gradcam/grad${sessionID}.png`; // Call evaluation with the link provided.
			const result = await runEvaluate(imageFileLink, sessionID);
			res.json({ result: result, gradCamPath: gradCamPath });
		} catch (error) {
			res.status(500).json({ error: error });
		}
	});

function logger(req, res, next) {
	console.log(req.originalUrl);
	next();
}

module.exports = router;
