const mongoose  = require('mongoose')
const validator = require('validator')


const taskSchema = new mongoose.Schema({

        description: {
                 type: String,
                 trim: true,
                 required: true
            },
        completed: {
                type: Boolean,
                default: false
            },
// this stores in database & showing connection between (task-user)   
        owner: {
                type:  mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'  //model name
            }
        }, {

                timestamps: true
})

                        //this is collection name//
const describe = mongoose.model('dedos', taskSchema)

/*const desc = new describe({
     description: '     hey lets go for lunch       ',
     
 })

 desc.save().then((desc) => {
     console.log(desc)
 }).catch((error) =>{
     console.log(error)
 })*/

 module.exports = describe