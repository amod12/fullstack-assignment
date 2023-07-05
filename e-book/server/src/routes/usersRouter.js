const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hashSync(req.body.password, 10);
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        req.body.password = hash
        const userData = Users.create(req.body);
        if (userData) {
          res.json({ 
            isRegistered:true,
            msg: "Your account is successfully Added" 
          });
        } else {
          res.json({ errorMsg: "something went worng" });
        }
      } else {
        res.status(409).json({ errorMsg: "user already exists" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const user = await Users.findOne({email: req.body.email}).lean()
  if(user){
    try{
    const {email,password} = user;
    const isMatched= await bcrypt.compareSync(req.body.password, password)
      if(email && isMatched){
        const token =await jwt.sign({email: req.body.email}, process.env.SECRET_TOKEN);
        user.token = token
        const {password, ...refactoredUserObj} = user
        res.status(200).json({
          msg:"logged in successfully",
          isLogedin:true,
          userData: refactoredUserObj
        })
      }
      else{
        res.status(401).json({
          errorMsg:"Invalid username and password"
        })
      }
    }
    catch(err){
      console.log(err)
    }
    }
    else{
      res.json({
        errorMsg:"User doesn't exist"
      })
    }
});
  
module.exports = router;
