const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let messageSchema = new Schema({
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    user2:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    username:{type:String},
    username2: {type:String},
    chat: [{
      message: String,
      sender: mongoose.Schema.Types.ObjectId
    }]
  });

module.exports = mongoose.model("Message", messageSchema);