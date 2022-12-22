const boolean = require("@hapi/joi/lib/types/boolean")
const number = require("@hapi/joi/lib/types/number")
const string = require("@hapi/joi/lib/types/string")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  userName : {
    type : string,
    require : true
  },
  email : {
    type : string,
    require : true
  },
  contact_No : {
    type : number,
    require : true
  },
  password : {
    type : string,
    require : true
  },
  gender : {
    type : boolean,
    require : true
  },
  profile_pic : {
    type : string,
  },
  role : {
    type : string,
    require : true
  },
  isActive : {
    type : boolean,
    require : true
  },
})
userSchema.set("timestamps",true)
module.exports = mongoose.model("user",userSchema)