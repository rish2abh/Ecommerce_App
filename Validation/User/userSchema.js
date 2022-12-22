const joi = require("joi")
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const schema = {
    signUpVal: joi
    .object({
      userName : joi.string().max(20).required(),
      email : joi.string().email().required(),
      contact_No : joi.number().min(0000000000).max(9999999999).required(),
      password : joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .messages({
          "password.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
          "password.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
          "password.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "password.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "password.noWhiteSpaces": "{#label} should not contain white spaces",
        })
        .required(),
      confirm_password:joi.string().required(),
      gender : joi.string().required(),
      role : joi.string().min(3).required(),
    })
    .unknown(true),
    loginVal: joi
    .object({
      email : joi.string().email().required(),
      password : joi.string().required()  
   }) 
}

module.exports = schema