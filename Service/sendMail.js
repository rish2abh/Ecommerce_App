var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"rishabhshrivastava205@gmail.com",
        pass:"ppgwmtkrfihspuqn"

    }
});
module.exports =  transporter 