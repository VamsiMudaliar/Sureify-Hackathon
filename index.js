const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const session = require('express-session')
const env = require('dotenv').config()

app = express()

app.set('view_engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public'));

// connection part

db = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.ndt8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  // connection part ends


  module.exports = function(passport){
    passport.use(new localStrategy({usernameField:"email"},function(email,password,done){
      User.findOne({email:email},(err,user)=>{
        
        if(err) return done(err);
        
        if(!user) return done(null,false,{message: 'Incorrect Credentials'})
        
        bcrypt.compare(password,user.password,function(err,res){
          
          if(err) return done(err);
          
          if(res===false) done(null,false,{message:"Incorrect Password"})
          
          return done(null,user)
        })
      })
    }));
  }
    
app.use(
  session({
  secret:"Vampire",
  resave: false,
  saveUninitialized:true
}))

// get User  model 
const User = require('./models/User') 

app.use(passport.initialize())
app.use(passport.session())


passport.serializeUser(function (user,done){
    done(null,user.id)
})

passport.deserializeUser(function (id,done){
  //Setup user Model
  User.findById(id,function(err,user){
    done(err,user);
  })
})


function isLoggedin(req,res,next){
  if(req.isAuthenticated()) return next()
  res.redirect('user/login')
}

const isLoggedOut = (req,res,next)=>{
  if(!req.isAuthenticated()) return next()
  res.redirect('user/login')
}

app.get('/',isLoggedin,(req,res)=>{
  app.locals.currentUser = req.user
//  console.log("USER DATA :",app.locals)
  res.render('home.ejs')
})

app.get('/logout',(req,res)=>{
  delete app.locals.currentUser
  req.logout();
  res.redirect('/user/login')
})

app.use('/user',require('./routes/user.js'))
app.use('/articles',require('./routes/articles.js'))
app.use('/profile',require('./routes/profile.js'))




const PORT = process.env.PORT

app.listen(PORT,()=>console.log(`Server Started on Port ${PORT}`))
