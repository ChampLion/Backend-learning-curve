import mongoose, {schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    watchHistory: [{
        type: mongoose.Types.ObjectId,
        ref: Videos
    }],
    avatar: {
        type: String,
        required: true
    },
    CoverImage: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    }

},{timestamps: true})

userSchema.pre('save', async function(next){
    if (this.isModified('password')){
    this.password = bcrypt.hash(this.password,10)
next()
}})
userSchema.methods.comparePass = async function(password){
return bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        user: this.username,
        fullName: this.fullName
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_TOKEN_EXPIRY})
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
        user: this.username,
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:REFRESH_TOKEN_EXPIRY})
}
export const User = mongoose.models('User',userSchema)