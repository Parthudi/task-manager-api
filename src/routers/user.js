const express = require('express')
const router = new express.Router()  // to create new router
const User = require('../models/users')
const auth = require('../middleware/auth')
const  multer = require('multer')
const sharp = require('sharp')
const { sendingWelcomeMail, sendingRemoveMail  }  = require('../emails/account')

router.post('/user',async (req, res) => { 

    try{
    const me = new User(req.body)

        await me.save()
        sendingWelcomeMail(me.email, me.name)
        const token = await me.generatetoken()
        

        res.status(201).send({me, token})
    } catch(error) {
        res.status(400).send(error)
    }
  /*  me.save().then((me) => {
        res.status(201).send(me)
    }).catch((error) => {
        res.status(400).send(error)
      //  res.send(error)
    })*/
})

router.post('/user/login' , async(req, res) => {
    try{
        const user = await User.findByCredential(req.body.email , req.body.password)

        const token = await user.generatetoken()
        res.send({user, token})
        } catch(error) {
            console.log(error)
                res.status(400).send('error occured')
        }
   
})

router.post('/user/logout',auth, async(req, res) => {
    try{
        req.user.tokense = req.user.tokense.filter((token) => {

            return token.token !==  req.token
        })
      await req.user.save()
    res.send()

    } catch (error) {
        res.status(400).send('error occured')
    }
})

router.post('/user/logoutall', auth, async(req, res) => {
    try{
            req.user.tokense = []
            await req.user.save()
            res.send()
    } catch (error) {
        res.status(500).send('error')
    }
})

router.get('/user/me',auth , async (req, res) => {
    res.send(req.user)
})


router.patch('/user/:me', auth ,async(req, res) => {
    const allowedupdates = ['name' , 'age' , 'email', 'password']
    const keyvalues = Object.keys(req.body)
    const validaton = keyvalues.every((value)=> {
        return allowedupdates.includes(value)
    })
    if(!validaton) {
        res.status(404).send('input invalid')
    }
try{
     const user = await req.user
      //  const user = await User.findByIdAndUpdate( _id , req.body , { new: true, runValidators: true })
    keyvalues.forEach((update) =>  user[update] = req.body[update])
    
    await user.save()

   res.status(202).send(user)

    } catch(error) {
        res.status(404).send(error)
    }
    
})

router.delete('/user/:me',auth ,async(req, res) => {
    try{
       /* const _id = req.user._id
        const deleteuser = await User.findByIdAndDelete(_id )

        if(!deleteuser) {
          return  res.status(400).send('user not found')
        }*/
        
        await req.user.remove()
        sendingRemoveMail(req.user.email, req.user.name)
        
        res.send(req.user)
    }catch(error) {
        res.status(404).send('error occured')
    }
   
})

const upload = multer({
    limits: {
        fileSize : 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
           return  cb(new Error('file not supported'))
          }
        cb(undefined, true)
    }
})

router.post('/user/me/avatar', auth,upload.single('avatar') , async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({height: 250, width:250}).png().toBuffer()
    //  req.user.avatar = req.file.buffer
    req.user.avatar = buffer //this is the modified image
   await req.user.save()
    res.send()
} , (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})


router.delete('/user/me/avatar', auth, async(req, res) => {
   req.user.avatar = undefined
   await req.user.save()
    res.send()
})

router.get('/user/:id/avatar', async(req, res) => {
    try{
            const user = await User.findOne({_id: req.params.id})
           
            if(!user || !user.avatar) {
                throw new Error('user not found')
            }
         //   res.set('Content-Type', 'image/png')
            res.send(user.avatar)
    } catch(error) {
            res.status(404).send('error in finding image')
    }
  
})

module.exports = router