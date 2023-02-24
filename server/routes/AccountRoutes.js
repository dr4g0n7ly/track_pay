const UserSchema = require('../models/UserSchema')
const AccountSchema = require('../models/AccountSchema')

const express = require('express')
const router = express.Router()

router.get('/getaccounts', async (req, res) => {
    const { email } = req.body

    const user = await UserSchema.findOne({ email })

    const accountIDs =  user.accounts.map((account) => { 
        return account
    })

    const accountDets = accountIDs.map((ID) => {
        AccountSchema.findById(ID, (err, dets) => {
            if (err){
                console.log(err)
            }
            else{
                console.log(dets)
            }
        })   
    })
  
    res.json(accountDets)

})

router.post('/addaccounts', async (req, res) => {
    const { email, name, digits, balance} = req.body

    if (!email) {
        return res.status(400).json({ msg: 'Email-ID is required'})
    }

    const user = await UserSchema.findOne({ email })
    if (!user) {
        return res.status(400).json({ msg: 'Email-ID not valid'})
    }

    // if (user.accounts.includes(name)) {
    //     return res.status(400).json({ msg: 'Account name already used'})
    // }

    const newAccount = new AccountSchema({ name, digits, balance })
    const savedAccountRes = await newAccount.save()

    if (!savedAccountRes) {
        return res.status(400).json({ msg: "Error saving new account to database" })
    }

    user.accounts.push(newAccount)
    const updatedUser = await user.save()

    if (updatedUser) {
        return res.json({ msg: "Account successfully created", newAccount, user})
    } else {
        return res.status(400).json({ msg: "Error updating user accounts" })
    }
})

router.patch('/addaccount', async (req, res) => {
    const { email, accounts } = req.body
})

module.exports = router;