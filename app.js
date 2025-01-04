require('dotenv').config();
 const path=require("path")
 const express=require("express")
 const mongoose=require("mongoose")
 const session= require("express-session")
 const multer=require("multer")
 const fs=require("fs")
 const User=require("./model/user");
 const user = require('./model/user');

 const User2=require("./model2/user2");
 const user2 = require('./model2/user2');

 const app=express()
 app.set('view engine','ejs')
 app.set('views','views')
 const PORT=process.env.PORT||5000
 app.use(express.static(path.join(__dirname,'./','public',)))
 mongoose.connect(process.env.DB_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log('Connected successfully'))

//upload image
var storage=multer.diskStorage({
  destination:function(req,file,cb)
  {
   cb(null,'./uploads')
  },
  filename:function(req,file,cb)
  {
    cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname)
  }
})
var upload=multer({
  storage:storage,
}).single("image")

//inserting records
app.post("/formpage",upload,(req,res)=>{
  const user=new User({
    name:req.body.name,
    age:req.body.age,
    birthdate:req.body.birthdate,
    gender:req.body.gender,
    education:req.body.education,
    phone:req.body.phone,
    religion:req.body.religion,
    image:req.file.filename
  });
  user.save().then(()=>{
    console.log("document save successfully")
  }).catch((error)=>{
    console.log("document hav'nt saved")
  })
  res.redirect('/formdata')
})






 //home page
 app.get("/",(req,res,next)=>{
 
    res.render("./partials/home")
   
 })

   //fetch img
 app.use(express.static("uploads"))

 //form page
 app.get("/formpage",(req,res)=>{
  res.render("./partials/form")
 })

 //formdatapage
 app.get("/formdata",(req,res)=>{
  user.find().then((users)=>{
    res.render("./partials/formdata",{
      
      users:users
    })
  }).catch((error)=>{
    console.log("data not stored in table")
  })
   
   })

 app.use(express.urlencoded({extended:false}))
 app.use(express.json());

 app.use(session({
  secret:"my secret key",
  saveUninitialized:true,
  resave:false
 }))

 app.use((req,res,next)=>{
  res.locals.message=req.session.message
  delete req.session.message;
  next()
 })

//update form
app.get("/edit/:id",(req,res)=>{
  let id=req.params.id;
  User.findById(id).then((user)=>{
    res.render('./partials/edituser',{
      title:"edit users",
      user:user
    })
   }).catch((err)=>{
    res.redirect('/formdata')
   })
})
//update data
app.post('/update/:id',upload,(req,res)=>{
  let id=req.params.id;
   User.findByIdAndUpdate(id,{
    name:req.body.name,
    age:req.body.age,
    birthdate:req.body.birthdate,
    gender:req.body.gender,
    education:req.body.education,
    phone:req.body.phone,
    religion:req.body.religion,
   
   }).then(()=>{
    res.redirect("/formdata")
   })
  })

//delete data
app.get('/delete/:id',(req,res)=>{
   let id=req.params.id;
   User.findByIdAndDelete(id).then(()=>{
    res.redirect("/formdata")
   }).catch((err)=>{
   console.log("somthing went wrong")
   })  
})

//second ragistration******************************************************

 //form2 page
 app.get("/formpage2",(req,res)=>{
  res.render("./partials/form2")
 })

 //formdata2page
 app.get("/formdata2",(req,res)=>{
  user2.find().then((users2)=>{
    res.render("./partials/formdata2",{
      
      users2:users2
    })
  }).catch((error)=>{
    console.log("data not stored in table")
  })
   
   })

//inserting records
app.post("/formpage2",upload,(req,res)=>{
  const user2=new User2({
    name:req.body.name,
    age:req.body.age,
    birthdate:req.body.birthdate,
    gender:req.body.gender,
    education:req.body.education,
    phone:req.body.phone,
    religion:req.body.religion,
    image:req.file.filename
  });
  user2.save().then(()=>{
    console.log("document save successfully")
  }).catch((error)=>{
    console.log("document hav'nt saved")
  })
  res.redirect('/formdata2')
})

//upload image
var storage=multer.diskStorage({
  destination:function(req,file,cb)
  {
   cb(null,'./uploads2')
  },
  filename:function(req,file,cb)
  {
    cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname)
  }
})
var upload=multer({
  storage:storage,
}).single("image")

//fetch img
app.use(express.static("uploads2"))

//update form
app.get("/editdata/:id",(req,res)=>{
  let id=req.params.id;
  User2.findById(id).then((user2)=>{
    res.render('./partials/edituser2',{
      title:"edit users",
      user2:user2
    })
   }).catch((err)=>{
    res.redirect('/formdata2')
   })
})
//update data
app.post('/updatedata/:id',upload,(req,res)=>{
  let id=req.params.id;
   User2.findByIdAndUpdate(id,{
    name:req.body.name,
    age:req.body.age,
    birthdate:req.body.birthdate,
    gender:req.body.gender,
    education:req.body.education,
    phone:req.body.phone,
    religion:req.body.religion,
   
   }).then(()=>{
    res.redirect("/formdata2")
   })
  })

//delete data
app.get('/deletedata/:id',(req,res)=>{
   let id=req.params.id;
   User2.findByIdAndDelete(id).then(()=>{
    res.redirect("/formdata2")
   }).catch((err)=>{
   console.log("somthing went wrong")
   })  
})



 app.listen(PORT,()=>{
  console.log(`server started at http://localhost:${PORT}`)
 })
