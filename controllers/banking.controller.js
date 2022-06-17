const db = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const BankingCustomerModel = db.banking


// Create
exports.create = (req,res,next) =>{
    let {name,mobile,address,email,password} = req.body
    BankingCustomerModel.create({
        name,
        mobile,
        address,
        email,
        password
    }, (err,result) => {
        if(err){
            res.json({
                message: "Error while saving customer",
                error: err
            })
        }
        res.json({
            status:200,
            data:result
        })
    })
}

//login
exports.login = (req,res,next) => {
    BankingCustomerModel.findOne({email : req.body.email}, (err,result) => {
        if(err){       
             next(err)
             console.log("invalid user")
        }
        else{
            if(bcrypt.compareSync(req.body.password,result.password)){
                const token = jwt.sign({id:result._id},req.app.get('secretKey'), {expiresIn:'1h'})
                res.json({
                    status:"Success",
                    message:"Successfully Logged in",
                    data: {
                        model: result,
                        token: token
                    }
                })
            }
        }
    })
}
// Get All
exports.getAll = (req,res,next) =>{
    BankingCustomerModel.find({},(err,result)=>{
        if(err)
        next(err)
        res.json({
            status:"success",
            message:"All Bankers Are Here",
            data:{
                model:result
            }
        })
    })

}
// Get By ID
exports.getById = (req,res,next) =>{
    BankingCustomerModel.findById(req.params.id,(err,result)=>{
        if(err)
        next(err)
        res.json({
            status:"Success",
            message:"Successfully Retrieved by ID Banker",
            data:{
                model:result
            }
        })
    })

}
// Get By Email
exports.getByEmail = (req,res,next) =>{
    BankingCustomerModel.find({"email":req.body.email},(err,result)=>{
        if(err)
        next(err)
        res.json({
            status:"Success",
            message:"Successfully Retrieved",
            data:{
                model: result
            }

        })
    })

}
// Update
exports.updateById = (req,res,next) =>{
BankingCustomerModel.findByIdAndUpdate(req.params.id,req.body,(err,result)=>{
    if(err)
    next(err)
    res.json({
        status:"Success",
            message:"Successfully Updated Banker By ID",
            data:{
                model: result
            }

    })
})
}
// Delete By Id
exports.deleteById = (req,res,next) =>{

    BankingCustomerModel.findByIdAndRemove(req.params.id,(err,result)=>{
        if(err)
        next(err)
        res.json({
            status:"Success",
            message:"Successfully Deleted Banker By ID",
            data:{
                model: result
            }

        })
    })
}
// Delete All
exports.deleteAll = (req,res,next) =>{

}

