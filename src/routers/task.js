const express = require('express')
const router = new express.Router()  //creating new router
const describe = require('../models/tasks')
const auth = require('../middleware/auth')

router.post('/task',auth, async(req, res) => {
       
   // const task = new describe(req.body)
    const task = new describe ({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.send(task)

    } catch(error) {
        res.status(404).send(error)
    }
        
})

//GET tasks?completed=true OR completed=false 
//GET tasks?limit=2 & skip = 3
//GET tasks?sortBy=createdAt:asc OR createdAt:desc
router.get('/tasks',auth, async (req, res) => {

    const match = {}
    const sort  = {}
    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')   //part0 is createdat or completedat or anything and part1 is desc or asc
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }                   //if parts1 is true than it return -1 esle it return +1 its //ternary operation//
    try {
            // const task = await describe.find({})

     //   const task = await describe.findOne({owner: req.user._id})
                            //OR//
        await req.user.populate({
            path: 'mytasks', 
            match,
            options:  {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(201).send(req.user.mytasks)
    } catch(error)  {
        res.status(404).send()
    }
})

router.get('/task/:id',auth, async(req, res) =>{
        const _id = req.params.id
    try{

       // const task = await describe.findById(_ide)
       const task = await describe.findOne({_id , owner: req.user._id })
            if(!task) {
                res.status(400).send('task not found')
            }
            res.send(task)
    } catch(error)  {
            res.status(500).send()
        }
})

router.patch('/task/:id' , auth, async (req, res) => {
    const allowed = ['description', 'completed']
    const keycall = Object.keys(req.body)
    const validate = keycall.every((value) => {
        return allowed.includes(value)
    })  
    if(!validate) {
        res.status(500).send('invalid input')
    }

    try{
        _id = req.params.id
          //  const task = await describe.findById(req.params.id)
        const task = await describe.findOne({_id , owner: req.user._id})
           
            await task.save()
           
            if(!task) {
                res.status(404).send('task not present')
            }
        keycall.forEach((update) => {
                return task[update] = req.body[update]
        })
            res.send(task)
    } catch(error) {
            res.status(400).send()
    }
})

router.delete('/task/:id' ,auth, async(req, res) => {
    try{
        const _id = req.params.id
      //  const deletetask = await describe.findByIdAndDelete( _id )
        const deletetask = await describe.findOneAndDelete({_id, owner: req.user._id})
       
        if(!deletetask) {
            res.status(400).send('task not found')
        }

      res.send(deletetask)
    } catch(error)  {
            res.status(500).send('error occured')
    }
    

})

module.exports = router