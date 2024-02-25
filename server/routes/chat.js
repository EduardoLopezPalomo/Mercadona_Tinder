var express = require('express');
var router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");
  
router.get("/:userId", async (req, res)=>{
  const id = req.params.userId;
  if(!id){
    return res.status(400).json({ error: 'ID parameter is required' });
  }
  const user = await User.findById(id);

  //save over each message
  const messageIds = user.messages;
  const fetchedMessages = [];
  for (const messageId of messageIds) {
    try {
      const message = await Message.findById(messageId);
      // Push the fetched message to the array
      fetchedMessages.push(message);
    } catch (error) {
      console.error(`Error fetching message with ID ${messageId}:`, error);
    }
  }

    if (!fetchedMessages) {
    return res.status(404).json({ error: 'Messages not found' });
    }
    res.json(fetchedMessages);
});


//get to have the message data
router.get('/getData/:userId/:likedUserId', async (req, res) => {
try {
    const id   = req.params.userId;
    const likedUserId = req.params.likedUserId;
    if (!id) {
    return res.status(400).json({ error: 'ID parameter is required' });
    }
    const user = await User.findById(id);

    user.messages.forEach(async messageId => {
      const message = await Message.findById(messageId);
      // Check if the user ID in the message matches userlikedId
      if (message.user == likedUserId || message.user2 == likedUserId) {

        const messageData = message;
        res.json(messageData);
      }
  });
    
} catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});


// Handle POST request to update the messages
router.post('/messages', async (req, res) => {
  try {
    // Extract message data from the request body
    const { userId, chat } = req.body;

    const message = await Message.findOne({ $or: [{ user: userId }, { user2: userId }] });

    // If message not found, return error
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
  
    // Add the new chat message to the chat array
    message.chat.push({message: chat, sender: userId});
    await message.save();
  
    res.status(201).json(message);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
  
  module.exports = router;