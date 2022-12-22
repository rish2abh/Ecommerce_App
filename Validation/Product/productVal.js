const schema = require("./productSchema")

module.exports = {
    productValidation: async (req, res, next) => {
      const value = await schema.productSch.validate(req.body, { abortEarly: true });
      if (value.error) {
        res.status(400).json({
          status: "Failed",
          message: value.error.details[0].message,
        });
      } else {
        next();
      }
    },
}