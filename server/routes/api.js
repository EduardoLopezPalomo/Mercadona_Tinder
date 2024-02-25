var express = require('express');
var router = express.Router();
// const controller = require("./controller");
const {body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage});
var idFromToken = null;


require('../auth/passport')(passport)
router.use(passport.initialize());

//finds all the users in the DB if authenticated
router.get("/user", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const user  = await User.find({});
        res.send(user);
    } catch (err) {
        console.error(err);
        res.send("No user.");
    }
});


router.post('/login',
  upload.none(),
  body("email").trim().escape(),
  body("password"),
  async (req, res) => {
    //checks if user exists with email
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.send({success: false, message: "Invalid credentials"});
        } else {
            //compares crypted password
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                //creates JWT
                const jwtPayload = {
                    id: user._id,
                    email: user.email
                }
                jwt.sign(
                    jwtPayload,
                    process.env.SECRET,
                    {
                    expiresIn: 7200  //expires on 7200s and log in is needed again.
                    },
                    (err, token) => {
                        res.json({success: true, token});
                        idFromToken = getIdfromToken(token);
                        localStorage.setItem("id", idFromToken);
                    }
                );
                } else {
                    return res.status(403).json({success: false, message: "Invalid credentials"});
                }
            })
        }
    } catch(err) {
        throw err;
    }
});

function getIdfromToken(token){
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return decodedToken.id;
}

router.get("/getID", async(req,res)=>{
    res.json(idFromToken);
});

// Register new user
router.post('/register', 
  //checks that email is correct format
  body("email").trim().isEmail().escape(),
  //checks that password meets the requirements (express-authenticator)
  body("password").isStrongPassword().withMessage('Password is not strong enough'),
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
         console.log("Errors");
      return res.status(400).json({success: false, errors: errors.array()});
      
    }
    //checks if email is already in use
    try {
        const duplicate = await User.findOne({email: req.body.email});
        if(duplicate){
            return res.status(403).json({success: false, message: "Email already in use"});
        } else {
        //if user doesn't exist creates new user
        //creates password hash and salts it
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if(err) throw err;
                const user = new User({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash,
                        likeYou: [],
                        match: []
                    });
                    user.save()
                        .then(result => {
                            console.log(result);
                            return res.json({success: true, message: "New user registered."});
                        })
                        .catch(err => {
                            console.error(err); 
                    })
            });
        });
        }
    } catch(err) {
        console.log(err);
    }
      
});

module.exports = router;