const mongoose = require("mongoose")

mongoose.set("strictQuery", false);
mongoose.connect(process.env.URL,{useNewUrlParser : true})
const connection = mongoose.connection 
connection.once ("open", (req,res)=>{
    console.log("MongoDB is connected")
})

