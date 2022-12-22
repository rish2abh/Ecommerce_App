const joi = require("joi")
const objectid = require("joi-objectid")(joi)

const productSchema = {
    productSch : joi
    .object({
        productName : joi.string().min(5).max(20).required(),
        description : joi.string().min(5).max(30).required(),
        price : joi.string().min(5).max(10).required(),
        rating : joi.string().min(0).max(5).required(),
        feature : joi.string().min(5).max(50).required(),
        spec : joi.string().min(5).max(40).required(),
        category : joi.string().min(5).max(20).required(),
        userID : joi.objectid().required(),
        productName : joi.string().min(5).max(20).required(),
    })
}

module.exports = productSchema