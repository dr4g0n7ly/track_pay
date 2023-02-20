const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    digits: {
        type: String,
        default: ''
    },
    balance: {
        type: Number,
        required: true,
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
})

const Account = mongoose.model('Account', AccountSchema)
module.exports = Account