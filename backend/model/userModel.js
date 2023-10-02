import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true ,"Please Enter name"],
        maxLength:[10,"Name digits not excced 10"],
        minLength:[4,"Name digits should have 4"]
    },
    email:{
        type:String,
        unique:true,
        required:[true],
        validator:[validator.isEmail,"Please Enter valide email"]
    },
    password:{
        type:String,
        required:[true],
        minLength:[8,"Password must be 8 digits or greater than that"]
    },
    Image: {
        publicId: String,
        url:String
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetpasswordToken:String,
    resetpasswordExpire:Date,
})
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
});
userSchema.methods.getJWTtoken = function(){
    return jwt.sign({id:this._id},process.env.JWR_SECRET,{
        expiresIn:process.env.JWR_EXPIRE,
    })
}

// Compared password
userSchema.methods.comparePassword = async function(enterpassword){
        return bcrypt.compare(enterpassword,this.password)
}

// Generating password reset token
userSchema.methods.getreset =  function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    // hashing and adding resetpasswordtoken schema
    this.resetpasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetpasswordExpire= Date.now() + 15*60*1000 ;
    return resetToken;
}

const userModel = mongoose.model("user",userSchema);

export default userModel

