const Product = require("../model/product_Schema")

const addProduct = async(req,res)=>{
const data = new Product(req.body)
try{
    // const filePath = `/uploads/${req.file.filename}`;
    // console.log("====>filePath", filePath);
    // const images = []
    // for (let a = 0; a < req.file.filename.length; a++) {
    //     images.push(req.file.filename[a])
    // }
    data.product_pic = images;
    const addProduct = await data.save()
    res.status(200).json({
        status : "Success",
        message : "Product Added Successfully",
        addProduct
    })
}catch(err){
    res.status(500).json({
        status : "Failed",
        message : err.message
    })
}
}


module.exports = addProduct