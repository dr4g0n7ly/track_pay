const UserSchema = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
  return res.json({ msg: 'Sign up page'})
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    if (!email || !password || !name) {
        return res.status(400).json({ msg: 'Name, Email and Password are required'})
    }

    const user = await UserSchema.findOne({ email })
    if (user) {
        return res.status(400).json({ msg: 'E-mail ID already registered' })
    }

    const newUser = new UserSchema({ name, email, password })
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            return res.status(400).json({ msg: 'Password encryption error' })
        }

        newUser.password = hash
        const savedUserRes = await newUser.save()

        if (savedUserRes) {
            return res.status(200).json({ msg: 'User successfully saved' })
        } else {
            return res.status(400).json({ msg: "Error saving new user to database"})
        }
    })
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
  
    if (!email || !password) {
      res.status(400).json({ msg: 'Email and Password are required' })
    }
  
    const user = await UserSchema.findOne({ email: email }) // finding user in db
    if (!user) {
      return res.status(400).json({ msg: 'User not found' })
    }
  
    // comparing the password with the saved hash-password
    const matchPassword = await bcrypt.compare(password, user.password)
    if (matchPassword) {
      const userSession = { email: user.email }
      req.session.user = userSession
      return res.status(200).json({ msg: 'You have logged in successfully', userSession }) 
    } else {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }
  })
  
  
  module.exports = router