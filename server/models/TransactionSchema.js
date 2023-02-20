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
    currBalance: {
        type: Number,
        required: true,
    }
})