const mongoose=require('mongoose')
const userschemma= new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  age:{
    type:String,
    require:true
  },
  birthdate:{
    type:String,
    require:true
  },
  gender:{
    type:String,
    require:true
  },
  education:{
    type:String,
    require:true
  },
  phone:{
    type:String,
    require:true
  },
  religion:{
    type:String,
    require:true
  },
  image:{
    type:String,
    require:true
  },
  created:{
    type:Date,
    require:true,
    defualt:Date.now,
  },

});

module.exports=mongoose.model('user',userschemma)