const express = require('express');
const router = express.Router();
const db = require('./db');

/**
 * API实现
 * 接口符合RESTful风格
 */

let n=0;
//查全部文章
router.get('/article', function(req, res){
    console.log('get article list '+ n++);
    db.Article.find({}, function(err, result){
        if ( err ) throw err;
        res.status(200).send(JSON.stringify(result)).end();
    });
});

//查一个文章
router.get('/article/:id', function(req, res){
    console.log("get article "+ n++);
    db.Article.findOne({_id: req.params.id}, function(err, result){
        if ( err ) throw err;
        res.status(200).send(JSON.stringify(result)).end();
    });
});

//增文章
router.post("/article", function(req, res){
    console.log('add article '+ n++);
    let article = new db.Article({
        title:req.body.title,
        content: req.body.content,
        author: req.body.author,
        category:req.body.category,
        created: new Date
    });

    article.save(function(err, result){
        if ( err ) throw err;
        res.status(200).send(JSON.stringify(result)).end();
    });
});

//改文章
router.put("/article/:id", function(req, res){
    console.log("modify article " + n++);
    db.Article.findOne({_id: req.params.id}, function(err, result){
        if ( err ) throw err;
        if(!result){
            res.json({
                message:"文章ID: " + req.params.id+" 没有找到",
            });
        }

        result.title   = req.body.title;
        result.content   = req.body.content;
        result.author = req.body.author;
        result.category = req.body.category;
        result.created  = new Date;

        result.save(function(err, result){
            if ( err ) throw err;
            res.status(200).send(JSON.stringify(result)).end();
        });

    });
});

//删文章
router.delete("/article/:id", function(req, res){
    console.log('delete article '+ n++);
    db.Article.findOneAndRemove({_id: req.params.id}, function(err, result){
        if ( err ) throw err;
        res.status(200).send(JSON.stringify(result)).end();
    });
});

module.exports = router;