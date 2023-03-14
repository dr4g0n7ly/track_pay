const UserSchema = require('../models/UserSchema')
const AccountSchema = require('../models/AccountSchema')
const TransactionSchema = require('../models/TransactionSchema')

const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/gettransactions/:user/:account', async (req, res) => {
    const email = req.params.user
    const accountString = req.params.account
    // const account = mongoose.Types.ObjectId(accountString)

    console.log(email)
    console.log(accountString)

    const user = await UserSchema.findOne({ email })
    if (!user) {
        return res.status(400).json({ msg: "Invalid user email-id"})
    }

    // const reqAccount = await AccountSchema.findById(account).exec()
    // if (!reqAccount) {
    //     return res.status(400).json({ msg: "Invalid account ID"})
    // }
    // else {
    //     console.log("valid account id")
    // }

    // const accounts = await Promise.all(
    //     user.accounts.map(async (accountID) => {
    //         const account = await AccountSchema.findById(accountID).exec()
    //         return account
    //     })
    // )

    // if (! reqAccount in accounts ) {
    //     return res.status(400).json({ msg: "Account ID not matching user accounts"})
    // } 

    // const transactions = await Promise.all(
    //     reqAccount.transactions.map(async (transactionID) => {
    //         console.log(transactionID)
    //         const transaction = await TransactionSchema.findById(transactionID).exec()
    //         return transaction
    //     })
    // ) 

    // console.log(transactions)

    return res.json({ msg:"fetched account transactions successfully"})
    // return res.json({ msg:"fetched account transactions successfully", transactions})
})

router.post('/addtransaction', async (req, res) => {
    const { email, account, amount, date, description, isExpense, category } = req.body

    if (!email || !account || !amount || !date || !category ) {
        return res.status(400).json({ msg: 'All fields except description are required'})
    }

    const user = await UserSchema.findOne({ email })
    if (!user) {
        return res.status(400).json({ msg: 'Email-ID not valid'})
    }

    const reqAccount = await AccountSchema.findById(account).exec()
    if (!reqAccount) {
        return res.status(400).json({ msg: "Invalid account ID"})
    }

    const accounts = await Promise.all(
        user.accounts.map(async (accountID) => {
            const account = await AccountSchema.findById(accountID).exec()
            return account
        })
    )

    if (! reqAccount in accounts ) {
        return res.status(400).json({ msg: "Account ID not matching user accounts"})
    } 

    const pb = reqAccount.balance - 0
    const a = amount - 0

    var currBalance
    if (isExpense) {
        currBalance = pb - a
    } else {
        currBalance = pb + a
    }

    if (currBalance < 0) {
        return res.status(400).json({ msg: `Insufficient funds in selected Account. Current balance: ${pb}`})
    }

    const newTransaction = new TransactionSchema({ amount, isExpense, description, date: Date.parse(date), category, currBalance })
    const savedTransactionRes = await newTransaction.save()

    if (!savedTransactionRes) {
        return res.status(400).json({ msg: "Erro saving new Transaction to database" })
    }

    reqAccount.transactions.push(newTransaction)
    reqAccount.balance = currBalance
    const updatedAccount = await reqAccount.save()

    if (updatedAccount) {
        return res.json({ msg: "Transaction successfully added", newTransaction, reqAccount})
    } else {
        return res.status(400).json({ msg: "Error updating account transactions" })
    }
    
}) 

module.exports = router
