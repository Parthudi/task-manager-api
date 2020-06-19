//if we dont dont want a page as response from the web server and we only want data i.e in the form of xml&json ,in this sever is not
// sending an object but its sending its state...so this is rest api i.e representational state transfer.
//so for that we use postman application.
//through postman app the https requests are tested & verified that rest api is working as accepted or not..through browser its more hectic.
//we connect environmental variables with our applic in dev dependes as start is going to upload on heroku
const express = require('express')    
require('./db/mongoose')
const useRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app  = express()
const port = process.env.PORT   //for deployment to heroku



app.use(express.json()) //automatically parse an incoming json data into object
app.use(useRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is running on: ' + port)
})







/*const multer = require('multer')

const upload = multer({
    dest: 'images',  //this will create a destination and create folder i.e- (images) in task-manager automatically
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)) {
           return cb( new Error('doc or docx only'))
        }
        cb(undefined, true)
    }
})  
app.post('/upload',upload.single('uploaded') , (req, res) => {
        res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})*/

/*app.use((req, res, next) => {
   if(req.method ==='POST') {
      return console.log('posting is not allowed')
   }
   console.log('posting allowed')
   next()
  //  next()
})*/

/*app.use((req, res, next) => {
    res.status('503').send('maintenance is going on please come later')
})*/


/*const bcrypt = require('bcrypt')
// we can use bcrypt only through async and await not in promises or anything
//middleware means before completing the task some one is checking in the middle eg:- from application to database middleware checks..
const myFunction = async() => {
    const password = 'parthu123'
    const hashedpass = await bcrypt.hash(password , 8)

    console.log(password)
    console.log(hashedpass)

    const isMatch = await bcrypt.compare('parthu123', hashedpass)
    console.log(isMatch)
}
myFunction()*/

// without middleware: new request -> run router handler
//with middleware: new request -> do something -> run router handler..

/*const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token =  jwt.sign({ _id : 'abc123'}, 'thisisforverify ',{expiresIn : '7 days' } )
    console.log(token)

    const data= jwt.verify(token, 'thisisforverify ')
    console.log(data)
}
myFunction()*/

/*const describe = require('./models/tasks')
const User     = require('./models/users')

const { populate } = require('./models/tasks')

const main = async () => {
    const task = await describe.findById('5ee5de7f9310ca3d703c5f60')
    await task.populate('owner').execPopulate()
    console.log(task.owner)

    const user = await User.findById('5ee5de749310ca3d703c5f5d')
    await user.populate('mytasks').execPopulate()
    console.log(user.mytasks)
}

main()*/