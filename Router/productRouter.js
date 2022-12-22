const express = require("express")
const router = express()
const controller = require("../controller/productController")
const upload = require("../middleware/ImageStorage")


router.post("/add",upload.array('product_pic'),controller)

module.exports = router
