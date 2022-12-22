const boolean = require("@hapi/joi/lib/types/boolean")
const number = require("@hapi/joi/lib/types/number")
const string = require("@hapi/joi/lib/types/string")
const mongoose = require("mongoose")

const Product_Schema = new mongoose.Schema({
  productName : {
    type : string,
    require : true
  },
  description : {
    type : string,
    require : true
  },
  price : {
    type : number,
    require : true
  },
  offer_price : {
    type : number,
    default : 0
  },
    rating : {
    type : number,
    default : 0
  },
  product_pic : {
    type : string,
  },
  feature : {
    type : string,
    require : true
  },
  spec : {
    type : string,
    require : true
  },
  category : {
    type : string,
    require : true
  },
  userID : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
  },
  isActive : {
    type : boolean,
    require : true
  },
})
Product_Schema.set("timestamps",true)
module.exports = mongoose.model("product",Product_Schema)