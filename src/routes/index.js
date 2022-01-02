const express = require("express");
const router  = express.Router();
const userRouter = require("src/apiServices/user/routes");


router.use("/user", userRouter)



module.exports = router;
