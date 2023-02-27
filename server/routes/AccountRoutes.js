const UserSchema = require('../models/UserSchema')
const AccountSchema = require('../models/AccountSchema')

const express = require('express')
const router = express.Router()

router.get('/getaccounts/:user', async (req, res) => {

    const email = req.params.user

    const user = await UserSchema.findOne({ email })


    const accounts = await Promise.all(
        user.accounts.map(async (accountID) => {
            const account = await AccountSchema.findById(accountID).exec()
            return account
        })
    )

    return res.json({ msg:"fetched all accounts successfully", accounts})
})

router.post('/addaccount', async (req, res) => {
    const { email, name, digits, balance} = req.body

    if (!email) {
        return res.status(400).json({ msg: 'Email-ID is required'})
    }

    const user = await UserSchema.findOne({ email })
    if (!user) {
        return res.status(400).json({ msg: 'Email-ID not valid'})
    }

    const accounts = await Promise.all(
        user.accounts.map(async (accountID) => {
            const account = await AccountSchema.findById(accountID, 'name').exec()
            return account
        })
    )

    var x = false
    accounts.map((account) => {
        if (account.name === name) { 
            x = true
        }
    })
    if (x === true) {
        return res.status(400).json({ msg: "Account name already used"}) 
    }
    
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