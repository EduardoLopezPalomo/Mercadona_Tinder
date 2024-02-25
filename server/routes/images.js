var express = require('express');
var router = express.Router();
const multer = require('multer');
const Image = require("../models/image");
const User = require("../models/user");

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/:userId', upload.single('image'), async (req, res) => {
    try {
      const newImage = new Image({
        buffer: req.file.buffer,
        mimetype: req.file.mimetype,
        name: req.file.originalname,
        encoding: 'base64'
      });
  
      const savedImage = await newImage.save();
      const userId = req.params.userId;

      // Convert the Buffer in a Url
      const imageUrl = `data:${newImage.mimetype};base64,${newImage.buffer.toString('base64')}`; 
      await User.findByIdAndUpdate(userId, { 
        $push: { 
          profileImage: { _id: savedImage._id },
          imageUrl: imageUrl 
        } 
      }); // Update the user's document to include the ObjectId of the uploaded image
  
      res.status(201).json(savedImage);
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload image', error: error.message });
    }
  });

router.get('/getData/:userId', upload.single('image'), async (req, res) => {
  try{
  const id   = req.params.userId;
  if (!id) {
    return res.status(400).json({ error: 'id parameter is required' });
  }
  const userData = await User.findById(id);
  if (!userData) {
    return res.status(404).json({ error: 'User not found' });
  }
  const imageId = userData.profileImage[0];
  const imageData = await Image.findById(imageId);
  res.json(imageData);
} catch (error) {
  console.error('Error fetching user data:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

module.exports = router;