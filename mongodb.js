// INSERT INTO DATABASE

//const mongodb     = require('mongodb')
//const MongoClient = mongodb.MongoClient
//const ObjectID    = mongodb.ObjectID
             //   OR
const {MongoClient , ObjectID} = require('mongodb')  //DESTRUCTION as object & value name are same 

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//const id = new ObjectID()
//console.log(id)
//console.log(id.getTimestamp())

MongoClient.connect( connectionURL , { useNewUrlParser: true } , (error, client) => {
    if(error)
      {
           return console.log('unable to connect to the database')
      }

    const db = client.db(databaseName)

 /*   db.collection('users').find({ age: '21'}).toArray((error, result) => {
        console.log(result)
})*/
 /*  db.collection('users').find({ age: '21'}).count((error, result) => {
    console.log(result)
})*/
   /* db.collection('users').findOne({ _id : new ObjectID('5ed7da20210caa1bbc9629b9') }, (error, result) => {

        if(error) {
            return  console.log('error occured')
        }
      console.log(result)
    })*/

   

    /*db.collection('users').insertOne({
        name: 'parth',
        age: '20'
    }, (error, result) => {
          if(error) {
              return console.log('unable to insert dataa')
          }
          
          console.log(result.ops)
    })
})*/

/*db.collection('users').insertMany([
      {
          name: 'dharvi',
          age : '24',
      }, {
          
        name : 'dad',
        age: '56'
      }, {

        name: 'mom',
        age: '21'
      }, 
       
], (error, result) => {
    if(error) {
        return console.log('unable to database')
    }
   console.log(result.ops)
})
    }) */

/*db.collection('tasks').insertMany([
  {
      description: 'clean the house',
      completed: true
  }, {
      description: 'pleaseeeeeee',
      completed: false
  }, {
        description : 'bhai mere karde',
        completed: true
  }, {
      description: 'bhai mere karde',
      completed: false
  }

], (error, result) => {
    if(error) {
        return console.log('unable to connect database')
    }
    console.log(result.ops)
})
})*/

/*db.collection('tasks').findOne({ _id: new ObjectID('5ed8b7904bb83c3a24d72b0e')},(error, result) => {

    console.log(result)
})
})*/

/*db.collection('tasks').find({description: 'bhai mere karde'}).toArray((error, result) => {
        console.log(result)
})
})*/

/*db.collection('tasks').find({completed: false}).toArray((error, result) => {
        console.log(result)
})*/

 /*db.collection('tasks').updateOne( { 
  
    _id: new ObjectID("5ed8b7904bb83c3a24d72b0e")
        
        }, {

        $set: {
            description : 'ok thanks bro'
              }
           }) .then((result) => {
                console.log(result)
                
            }).catch((error) => {
                console.log(error)
            }) */
      



 /*db.collection('users').updateOne({
    _id : new ObjectID('5ed7bf7fa735f149381d039e')
}, {
    $inc: {
        age: -1
    }
} ).then((result) => {
    console.log(result)
}).catch((error) => {
        console.log(error)
})*/

/*db.collection('users').insertOne({
    name: 'rajendra',
    age: 49
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})*/

db.collection('users').deleteOne({
    age: 49
}).then((result) => {
        console.log(result)
}).catch((error) => {
        console.log(error)
})
})

//delete many means same age all data will be removed & delete one means only one i.e the topmost will be deleted only..
//findOne means willl only find the one which is at the top & find will let us see all the related ones ..
//updateOne will only update the topmost 1 entry only and updateMany will change asmany entry that are matching... 
//useNewURLParser: true, means when new url is available replace it with the older one 