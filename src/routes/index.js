const express = require("express");
const router  = express.Router();
const userRouter = require("src/apiServices/user/routes");
const secretRouter = require("src/apiServices/secret/routes");


router.use("/user", userRouter)
router.use("/secret", secretRouter)



module.exports = router;
