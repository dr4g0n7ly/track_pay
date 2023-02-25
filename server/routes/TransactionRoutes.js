const UserSchema = require('../models/UserSchema')
const AccountSchema = require('../models/AccountSchema')
const TransactionSchema = require('../models/TransactionSchema')

const express = require('express')
const router = express.Router()

router.post('/gettransactions', async (req, res) => {
    const { email, account } = req.body

    const user = await UserSchema.findOne({ email })
    if (!user) {
        return res.status(400).json({ msg: "Invalid user email-id"})
    }

    const reqAccount = await AccountSchema.findById(account).exec()
    if (!reqAccount) {
        return res.status(400).json({ msg: "Invalid account ID"})
    }

    const accounts = await Promise.all(
        user.accounts.map(async (accountID) => {
            console.log(accountID)
            const account = await AccountSchema.findById(accountID).exec()
            return account
        })
    )

    // need to check if accounts contains reqAccount

    const transactions = await Promise.all(
        user.account.map(async (transactionID) => {
            console.log(transactionID)
            const transaction = await TransactionSchema.findById(transactionID).exec()
            return transaction
        })
    )

    return res.json({ msg:"fetched account transactions successfully", transactions})
})
