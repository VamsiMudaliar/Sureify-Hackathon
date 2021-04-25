const router = require('express').Router()
const passport = require('passport')

const Articles = require('../models/Articles')
const Comments = require('../models/Comments')

const path = require('path')
// file uploads
const multer = require('multer')

// set configuration of passport
require('../index')(passport)

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images/')
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})



router.get('/create',(req,res)=> res.render('create_article.ejs'))

router.get('/',(req,res)=>{
    if(!req.isAuthenticated()){
        res.redirect('/user/login')
    }
    else{

        Articles.find({},(err,result)=>{
            console.log(result)
            res.render('articles.ejs',{articles:result})
        })

    }
})

router.get('/view/:id',async (req,res)=>{

    if(!req.isAuthenticated())
        res.redirect('/user/login')
    else{
        try{
        const id = req.params.id;

        // load Articles
        const result = await Articles.findOne({_id:id});
        
        const comments = await Comments.find({article:id})
        
        console.log("COMMENTS :",comments)

        res.render('single_article.ejs',{article:result,comments:comments})
        }
        catch(err){
            console.log(err)
        }
    }
})

router.post('/create',upload.single('article_image'),(req,res)=>{
    
    const {title,description} = req.body;

    const article_image = req.file
    console.log(article_image)
    article_image.path = article_image.path.replace('public/','')
    
    const article = new Articles({
        title: title,
        body: description,
        article_image:article_image.path,
        author : app.locals.currentUser._id
    })

    console.log("Path : ",article_image)
    console.log("APP DATA : ",app.locals)
    
    article.save();
    console.log("image Uploaded")
    res.redirect('/articles')
})


router.post('/:id/comment',async(req,res)=>{

    // get the post

    const article = await Articles.findOne({_id:req.params.id});

    // create a comment

    let cleaned_comment = req.body.content.trim()

    const comment = new Comments({
        content: cleaned_comment,
        article: article._id,
        posted_by:app.locals.currentUser.name
    })
    await comment.save();

    article.comments.push(comment._id)

    await article.save()

    let url = "/articles/view/"+req.params.id+"/"

    res.redirect(url)

})



module.exports = router 
