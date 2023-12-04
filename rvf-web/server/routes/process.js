const express = require("express");
const router = express.Router();

router.use(logger);

// root route of process
router.route('/')
    /**
     * requests will send in a link on where uploaded image is stored. 
     * respond with real/fake classification result and gradCam. 
     */
    .post(async(req, res)=>{
        //ToDo. Process image with pytorch model. 

    })


function logger(req, next){
    console.log(req.originalUrl);
    next(); 
}

module.exports = router; 