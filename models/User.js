
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type:String,required:true},
  username:{type:String,required:true},
  password:{type:String,required:true}
});


//REGISTER ROUTE
//in userSchema there is a pre method which allows us to do operations before doing somthing eg(save)
userSchema.pre("save", async function(){  //(NO next in async middleware)
  const schema = this;

  if (!schema.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(schema.password, salt);

  schema.password = hash;

});


//Login route
userSchema.methods.comparePass = async function (pass) {
    return bcrypt.compare(pass,this.password);   // user entered pass is mathching with pass in DB
    
};

const User = mongoose.model("User",userSchema);
module.exports=User;

