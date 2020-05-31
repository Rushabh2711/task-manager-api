const express = require('express')
require('./db/mogoose')
// const User = require('./models/user')
// const Task = require('./models/task')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
const port = process.env.PORT

//express middleware
// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     // next()
//     res.status(503).send('Under Maintenance')
// })

app.use(express.json())//parse incoming json into a object
app.use(userRouter) 
app.use(taskRouter)
 
// app.post('/users', async (req, res) => {
//     // console.log(req.body)
//     // res.send('testing!')
//     const user = new User(req.body)

//     try {
//         await user.save()
//         res.status(201).send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
//     // user.save().then(() => {
//     //     res.status(201).send(user)
//     // }).catch((e) => {
//     //     res.status(400).send(e)
//     //     // res.send(e)
//     // })
// })

// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
//     // User.find({}).then((users) => {
//     //     res.send(users)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

// //route parameters
// app.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     // console.log(_id)
//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }


//     // User.findById(_id).then((user) => { //conver id to objectID by mongoose
//     //     if (!user) {
//     //         return res.status(404).send()
//     //     }

//     //     res.send(user)
//     // }).catch(() => {
//     //     res.status(500).send()
//     // })
// })

// app.patch('/users/:id', async (req, res) => {
//     try {
//         const update = Object.keys(req.body)
//         const allowedUpdate = ['name', 'email', 'password', 'age']
//         const isValid = update.every((u) => allowedUpdate.includes(u))

//         if( !isValid ) {
//             return res.status(400).send('Invalid Update')
//         }

//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//         if( !user ) {
//            return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(400).send()
//     }
// })

// app.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if ( !user ) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })


// app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body)
//     try {
//         await task.save()
//         res.status(201).send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
//     // task.save().then(() => {
//     //     res.status(201).send(task)
//     // }).catch((e) => {
//     //     res.status(400).send(e)
//     // })
// })

// app.get('/tasks', async (req, res) => {

//     try {
//         const tasks = await Task.find({})
//         res.send(tasks)
//     } catch (e) {
//         res.status(500).send()
//     }
//     // Task.find({}).then((tasks) => {
//     //     res.send(tasks)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

// //route parameters
// app.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const task = await Task.findById(_id)

//         if (!task) {
//             return res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
//     // Task.findById(_id).then((task) => { //conver id to objectID by mongoose
//     //     if (!task) {
//     //         return res.status(404).send()
//     //     }

//     //     res.send(task)
//     // }).catch(() => {
//     //     res.status(500).send()
//     // })
// })

// app.patch('/tasks/:id', async (req, res) => {
//     try {
//         const update = Object.keys(req.body)
//         const allowedUpdate = ['description', 'completed']
//         const isValid = update.every((u) => allowedUpdate.includes(u))

//         if( !isValid ) {
//             return res.status(400).send('Invalid Update')
//         }

//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//         if( !task ) {
//            return res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(400).send()
//     }
// })

// app.delete('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id)

//         if ( !task ) {
//             return res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

app.listen(port, () => {
    console.log('Servwer up and running on port ' + port)
})

// const bcrypt = require('bcryptjs')

// const myFun = async () =>  {
//     const password = 'rushabh'
//     const hasedPassword = await bcrypt.hash(password, 8)

//     console.log(hasedPassword)
//     console.log(await bcrypt.compare('rushabh', hasedPassword))

// }
// myFun()


//-----------------------------jwt-------------
// const jwt = require('jsonwebtoken')

// const myFun =async () => {
//     const token = jwt.sign({ _id: 'ase23' }, 'thisisrush', {expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisisrush')
//     console.log(data)


// }
// myFun()

//-------------------------------------------------------------------------------------

// const multer = require('multer')
// const uplode = multer({
//     dest: 'image',
//     limits: {
//         fileSize: 100000,
//     },
//     fileFilter(req, file, cb) {
//        if (!file.originalname.match(/\.(doc|PNG)$/)) {
//         return cb(new Error('File must be ...'))
//        }

//        cb(undefined, true)
//         // cb(new Error('File must be PDF'))
//         // cd(undefined, true)
//         // cd(undefined, false)

//     }

// })
// app.post('/upload', uplode.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })