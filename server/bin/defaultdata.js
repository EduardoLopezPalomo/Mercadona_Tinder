//this is just some data example to see how the database is going
const User = require("../models/user");
const Image = require("../models/image");
const Message = require("../models/message");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const fs = require('fs');
const path = require('path');

/*const password = generateHashedPassword();
function generateHashedPassword() {
  try {
    const salt =  bcrypt.genSalt(10);
    const hash =  bcrypt.hash("password", salt);
    return hash;
  } catch (err) {
    console.error('Error generating hashed password:', err);
    throw err;
  }
}*/

const userAux =[
    {
      "firstname":"Vargas",
      "lastname": "Alejandro",
      "email": "example1@gmail.com",
      "password": "password",
      "bio": "I know Walter White and bla bla bla bla bla bla  bla bla lbal",
      "likeYou": [],
      "match" : [],
      "profileImage": [],
      "imageUrl": [],
      "messages": []
    },
    {
      "firstname":"Daniel",
      "lastname": "Manita",
      "email": "example2@gmail.com",
      "password": "password",
      "bio": "I know Json Tatum and bla bla bla bla bla bla  bla bla lbal",
      "likeYou": [],
      "match" : [],
      "profileImage": [],
      "imageUrl": [],
      "messages": []
    },
    {
      "firstname":"Hot",
      "lastname": "Hotillo",
      "email": "example1@gmail.com",
      "password": "password",
      "bio": "I'm always Hot and bla bla bla bla bla bla  bla bla lbal",
      "likeYou": [],
      "match" : [],
      "profileImage": [],
      "imageUrl": [],
      "messages": []
    },
    {
      "firstname":"Aram",
      "lastname": "especial",
      "email": "example2@gmail.com",
      "password": "password",
      "bio": "Im gonna be a pilot and bla bla bla bla bla bla  bla bla lbal",
      "likeYou": [],
      "match" : [],
      "profileImage": [],
      "imageUrl": [],
      "messages": []
    },
    {
      "firstname":"Diego",
      "lastname": "Washinton",
      "email": "example1@gmail.com",
      "password": "password",
      "bio": "I know Abraham Lincon and bla bla bla bla bla bla  bla bla lbal",
      "likeYou": [],
      "match" : [],
      "profileImage": [],
      "imageUrl": [],
      "messages": []
    },
    {
      "firstname":"Guille",
      "lastname": "Traidor",
      "email": "example2@gmail.com",
      "password": "password",
      "bio": "I'm the only one with girldfriend and bla bla bla bla bla bla  bla bla lbal",
      "likeYou": [],
      "match" : [],
      "profileImage": [],
      "imageUrl": [],
      "messages": []
    },
    {
      "firstname":"Pablo",
      "lastname": "M palabra",
      "email": "example1@gmail.com",
      "password": "password",
      "bio": "I am Buserant and bla bla bla bla bla bla  bla bla lbal",
      "likeYou": [],
      "match" : [],
      "profileImage": [],
      "imageUrl": [],
      "messages": []
    },
    {
      "firstname":"Pau",
      "lastname": "mini C-Bum",
      "email": "example2@gmail.com",
      "password": "password",
      "bio": "I am C bum and bla bla bla bla bla bla  bla bla lbal",
      "likeYou": [],
      "match" : [],
      "profileImage": [],
      "imageUrl": [],
      "messages": []
    },
];
const imagePath = path.join(__dirname, '..', 'public', 'images');
const imagePaths = [
   `${imagePath}/Vargas.jpg`,
   `${imagePath}/Dani.jpg`,
   `${imagePath}/Hot.jpg`,
   `${imagePath}/Aram.jpg`,
   `${imagePath}/Diego.jpg`,
   `${imagePath}/Guille.jpg`,
   `${imagePath}/Pablo.jpg`,
   `${imagePath}/Pau.jpg`
];

const imageBuffers = imagePaths.map(filePath => {
  return {
    buffer: fs.readFileSync(filePath),
    mimetype: 'image/jpeg', 
    name: filePath.split('/').pop(), 
    encoding: 'base64' 
  };
});

  
  async function insertSampleData() {
    try {
      const images = await Image.create(imageBuffers);
      const imageIds = images.map(image => image._id);
      const imageUrls = images.map(image => `data:${image.mimetype};base64,${image.buffer.toString('base64')}`);
      
      const users = await Promise.all(userAux.map(async (user, index) => {
        const newUser = await User.create({
          ...user,
          profileImage: imageIds[index],
          imageUrl: imageUrls[index],
        });
        return newUser;
      }));
      
      console.log("data inserted sussesfully");
    } catch (error) {
      console.error("Error inserting sample data:", error);
    } 
  };

  async function deleteAllDocuments() {
    try {
      await User.deleteMany({});
      await Image.deleteMany({});
      await Message.deleteMany({});
      console.log("All documents deleted successfully!");
    } catch (error) {
      console.error("Error deleting documents:", error);
    } 
  };

  module.exports = {deleteAllDocuments, insertSampleData}; 
