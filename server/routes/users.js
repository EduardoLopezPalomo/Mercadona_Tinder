var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Message = require("../models/message");

// Get all users from the database
router.get('/:userId', async (req, res) => {
  try {
    const userLoggin = req.params.userId; 
    const users = await User.find();

    // Filter out the user who is logged in
    const filteredUsers = users.filter(user => user._id.toString() !== userLoggin);

    res.json(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' }); 
  }
});

//get to have the user data
router.get('/getData/:userId', async (req, res) => {
  try {
    const id   = req.params.userId;
    if (!id) {
      return res.status(400).json({ error: 'Name parameter is required' });
    }
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Handle POST request to update user profile
router.post('/updateProfile', async (req, res) => {
  try {
    const userId = req.body.userlikedId;
    const yourId = req.body.yourId;
    
    // Find the user by ID in the database
    const userliked = await User.findById(userId);
    const userWhoLike = await User.findById(yourId);

    if (!userliked || !userWhoLike) {
      return res.status(404).send('User not found');
    }

    //update the like
    const like = {
      userId : userWhoLike._id,
      status: true
    }
    userliked.likeYou.push(like);
    
    let match = false;
    const liked =  userWhoLike.likeYou.find(item => item.userId.equals(userliked._id) && item.status === true);
    console.log(liked);
    // Update the match
    if(liked){
      const matchUser1 = {
        userId: userliked._id,
        status: true
      };
      const matchUser2 = {
        userId: userWhoLike._id,
        status: true
      };

      userliked.match.push(matchUser2);
      userWhoLike.match.push(matchUser1);
      match = true;

      const newMessage = await Message.create({
        user: userliked._id,
        user2: userWhoLike._id, 
        username: userliked.firstname,
        username2: userWhoLike.firstname,
        chat: [] 
      });
  
      // Save the ID of the new message in the user's messages array
      userWhoLike.messages.push(newMessage._id);
      userliked.messages.push(newMessage._id);
      await userWhoLike.save();
      await userliked.save();

      res.status(200).json({match});
    }
    else{
      // Save the updated user object back to the database
      await userliked.save();
      res.status(201).json({match});
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/changeProfile', async (req, res) => {
  try {
    const userId = req.body._id;
    const updatedProfileData  = req.body.user;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update the user's profile data
    user.bio = updatedProfileData.bio;
    user.email = updatedProfileData.email;
  
    // Save the updated user object back to the database
    await user.save();

    res.status(200).send('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
