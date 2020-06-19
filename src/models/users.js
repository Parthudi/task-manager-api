const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const describe = require('../models/tasks')

const userSchema = new mongoose.Schema({
         name: {
                 type: String ,
                 required: true,
                 trim: true
         },
        email: {
                 type: String,
                 unique: true,
                 required: true,
                 trim: true,
                 lowercase: true,
                 validate(value) {
                     if(!validator.isEmail(value)) {
                         throw new Error('email is invalid')
                 }

             } 
         },
         password: {
                 type: String,
                 trim: true,
                 required: true,
                 minlength: 7,
                 validate(value) {
                
                if(value.toLowerCase().includes('password')) {
                     throw new Error('password cannot contain password')
                     }
                 }
             },
         age: {
             type: Number,
             default: 0,
             validate(value) {
                 if(value < 0) {
                 throw new Error('age cannot be negative')
              }
            }
          },
        tokense: [{
            token: {
                type: String,
                required: true
            }
          }],
          avatar: {
              type: Buffer
          }
     }, {
        timestamps: true
     })
//virtual property // this dosent store in database only showing connection between (user-task)
userSchema.virtual('mytasks', {
    ref : 'dedos',                             //model name comes in refrence
    localField:'_id'  ,
    foreignField: 'owner'
})

//this is not accessible withiut using standard function
//hash the plain text password before saving
userSchema.pre('save' , async function(next) {
    const user = this   //catch each message

      if(user.isModified('password')) { 
          user.password = await bcrypt.hash(user.password, 8)
      }
        next()
})

//delete user tasks when user is removed
userSchema.pre('remove' , async function (next) {
    const user = this

    await describe.deleteMany({ owner: user._id})
    next()
})


userSchema.methods.generatetoken = async function()  {
    const user = this
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ _id: user._id.toString() } , secret)

    user.tokense = user.tokense.concat({ token })

    await user.save()
    return token
}

//if we use async in below function every data will be removed
userSchema.methods.toJSON = function() {  //from everywhere the 2 data below will be deleted from every router, through toJSON
    const user = this

    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokense
    delete userObject.avatar
    
    return userObject
}

userSchema.statics.findByCredential = async(email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('unable to find user')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('login failed!!!!')
    }

    return user
}
const User = mongoose.model('User', userSchema)    



  /*const me = new User({
     name: '  parth',
     email: 'parmarparth@gmail.com',
     password: 'password'
 })

 me.save().then((me) => {
     console.log(me)
 }).catch((error) => {
     console.log(error)
 })*/

 module.exports = User