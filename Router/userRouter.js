const express = require("express")
const router = express()
const userController = require("../controller/userController")
const userVal = require("../Validation/User/userValidation")
const upload = require('../middleware/ImageStorage')

router.post("/signup",userVal.userValidation,userController.signUp)
router.get("/login",userVal.userloginVal,userController.login)
router.post("/sendUserResetPasswordEmail",userController.sendUserResetPasswordEmail)
router.post("/ResetPassword",userController.userPasswordReset)
router.patch("/update/:id",upload.single('profile_pic'),userController.editProfile)


module.exports = router;

