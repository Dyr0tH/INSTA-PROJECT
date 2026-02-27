const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    following: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    status:{
        type: String,
        default: "pending",
        enum: ['accepted', 'pending', 'rejected']
    }
}, { timestamps: true })

followSchema.index({ follower: 1, following: 1 }, { unique: true })

const followModel = mongoose.model("follow-edge", followSchema);

module.exports = followModel;