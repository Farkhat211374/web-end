const ProductModel  = require("../models/ProductModel");

exports.get = async (req,res)=>{
    try {
        const product = await ProductModel.find();
        res.json(product);
    } catch(error) {
        res.json({message: error.message});
    }
};

exports.create = async (req, res) => {
    const newProduct =  new ProductModel({
        name: req.body.name,
        type: req.body.type,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description
    });
    newProduct.save(function(err){
        if (err) {
            console.log(err);
        } else {
            res.send({message: "Product was created!"});
        }
    });
};