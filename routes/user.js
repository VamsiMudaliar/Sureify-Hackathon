const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User') 
const passport = require('passport')


require('../index')(passport)

function isOk(req,res,next){
    if(!req.isAuthenticated()){
        console.log("RED")
        return next();
    }
        res.redirect('/')
}

router.get('/login',isOk,(req,res)=> res.render('login.ejs'))
router.get('/register',isOk,(req,res)=> res.render('signup.ejs'))

router.post('/login',isOk,passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect: '/user/login?error=true'
}))


router.post('/register', async (req,res)=>{

    const {uname,email,password} = req.body

    const exists = await User.exists({email:email})

    if(exists){
        res.redirect('/user/login');
        return;
    }

    bcrypt.genSalt(10,function(err,salt){
        if(err) return next(arr);
        bcrypt.hash(password,salt,function(err,hash){
            if(err) return next(err)
            
            const Employee = new User({
                name:uname,
                email:email,
                password:hash
            })

            Employee.save()
            res.redirect('/user/login')
        })
    })


})

router.get('/logout',(req,res)=>{
    req.logout();
    delete app.locals.currentUser
    res.render('/user/login')
})


module.exports = router 
