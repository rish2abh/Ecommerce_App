require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const router = require("./Router/mainRouter")
require("./model/config")

app.use(bodyParser.json())
app.use("/",router)

const server = app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is running on port no : ${process.env.PORT}`)
})


module.exports = server