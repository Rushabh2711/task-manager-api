const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeMail } = require('../emails/account')
const router = new express.Router()

// router.get('/test', (req, res) => {
//     res.send('mt res')
// })

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        sendWelcomeMail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
       req.user.tokens = req.user.tokens.filter((token) => {
           return token.token !== req.token
       })
       await req.user.save()

       res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
       req.user.tokens = []
       await req.user.save()

       res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})

// /users -> /user/me 
router.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }
    res.send(req.user)
})

//not needed--------------------------------------
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    
    const update = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const isValid = update.every((u) => allowedUpdate.includes(u))

    if( !isValid ) {
        return res.status(400).send('Invalid Update')
    }

    try {
        //middle ware not working so we have to follow traditional method here
        // const user = await User.findById(req.params.id)

        update.forEach( (u) => req.user[u] = req.body[u] )
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // if( !user ) {
        //    return res.status(404).send()
        // }

        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)

        // if ( !user ) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        // sendGoodbyMail()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
            return cb(new Error('Please upload an image'))
            }

        cb(undefined, true)
    }
})

// const errorMiddleware = (req, res, next) => {
//     throw new Error('From middleware error')
// }

router.post('/users/me/avatar', auth,/*errorMiddleware*/ upload.single('avatar') , async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width:250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        console.log('user')
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(400).send({ error: e.message })
    } 
})

module.exports = router