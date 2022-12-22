const express = require("express")
const router = express()
const user = require("./userRouter")
const product = require("./productRouter")

router.use("/user",user)
router.use("/product",product)


module.exports = router
