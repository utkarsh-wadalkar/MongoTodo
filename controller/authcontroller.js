
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
async function register(req, res) {
  let { name, username, password } = req.body;

  try {
    const duplicate = await User.findOne({ username });
    if (duplicate) {
      return res.status(400).send({ message: "Username Already Exists !" });
    }

    let newUser = new User({ name, username, password });
    const result = await newUser.save();

    res.status(201).send({ message: "User Registered Successfully !" });

  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

//LOGIN
async function login(req, res){
  try{
    const {username,password} = req.body;
    const user = await User.findOne({username});
        if(!user){
          return res.status(400).send({error:"Username not found"})
        }

        const passValid = await user.comparePass(password)
        if(!passValid){
          return res.status(400).send({error:"Invalid Password"})
        }
        //if both is valid then create token jwt.sign()

        let token = jwt.sign({userId:user._id}, JWT_SECRET, {expiresIn:'24h'})
        
        let checkData = {        //to check what is being requested and send it to backend
          userId: user?._id,
          name: user?.name,
          username: user?.username,
          token
        }
        
        res.status(201).send({
          message: "Login Successful",
          userdata: checkData
        });

    }catch(err){
      console.log(err);
      res.status(400).send(err)
    }
}
const authcontroller ={
    register,
    login
}

module.exports = authcontroller;