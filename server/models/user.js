const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    bio:{type: String},
    likeYou:[{
        userId:  mongoose.Schema.Types.ObjectId,
        status: Boolean
    }],
    match:[{
        userId:  mongoose.Schema.Types.ObjectId,
        status: Boolean
    }],
    profileImage:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
      }],
    imageUrl:[{type: String}],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

module.exports = mongoose.model("User", userSchema);