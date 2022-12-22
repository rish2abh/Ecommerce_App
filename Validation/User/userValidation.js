const user = require("./userSchema");

module.exports = {
  userValidation: async (req, res, next) => {
    const value = await user.signUpVal.validate(req.body, { abortEarly: true });
    if (value.error) {
      res.status(400).json({
        status: "Failed",
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  userloginVal: async (req, res, next) => {
    const value = await user.loginVal.validate(req.body, { abortEarly: true });
    if (value.error) {
      res.status(400).json({
        status: "Failed",
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
