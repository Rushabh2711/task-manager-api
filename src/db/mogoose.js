const mongoose = require('mongoose')
// const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(v) {
//             if ( !validator.isEmail(v) ) {
//                 throw new Error('Email not valid!!')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 6,
//         validate(p) {
//             if (p.toLowerCase().includes('password')) {
//                 throw new Error('Password can not contain "password"')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('negative number not allow!!')
//             }
//         }
//     }

// })

// const me = new User({
//     name: 'Rushabh          sheta           ',
//     email: 'RUSHABH@mail.com     ',
//     password: '     Rushabh123       '
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((e) => {
//     console.log(e)
// })

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     description: 'eating',
//     // completed: false
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((e) => {
//     console.log(e)
// })