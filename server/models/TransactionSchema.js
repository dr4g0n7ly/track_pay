const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    isExpense: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        required: true,
    },
    currBalance: {
        type: Number,
        required: true,
    }
})


const Transaction = mongoose.model('Transaction', TransactionSchema)
module.exports = Transaction