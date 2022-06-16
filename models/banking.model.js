const bcrypt = require('bcrypt')

module.exports = mongoose => {
    var BankingSchema = mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        mobile:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true
        },
    }, 
        {timestamps: true}
    )

    BankingSchema.method("toJSON", function(){
        const {_id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    BankingSchema.pre('save', function (next){
    
        const saltRounds = 10
      
        this.password = bcrypt.hashSync(this.password, saltRounds)
        
        next()
    })

    
  
    
    const BankingCustomerModel = mongoose.model("customer",BankingSchema)

    return BankingCustomerModel

}
