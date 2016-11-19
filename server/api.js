const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./db');

/**
 * API implacement
 * 接口符合RESTful风格
 */

let n=0;
/**
 * 前台 查全部文章
 * sort by created
 * inflated the article's ref (author and category)
 * return data to the front
 * query by category and author
 * slice the pages : curPage-current page; pageSize-count pre page; pageCount-total pages
 *
 * type:get
 * Parameters: /articel?page=n
 * Response:{
 *      result:[{Article}],
        pageCount:n,
        curPage:n,
 * }
 */
router.get('/article', function(req, res, next){
    db.Article.find({published:true})
        .sort('created')
        .populate('author')
        .populate('category')
        .exec(function(err, result){
            console.log('get article list '+ n++, 'cur page: '+JSON.stringify(req.query));

            if ( err ) throw next(err);
            let curPage=Math.abs(parseInt(req.query.page||1, 10));
            let pageSize=5;
            let totalCount=result.length;
            let pageCount=Math.ceil(totalCount/pageSize);

            if(curPage>pageCount) curPage=pageCount;

            let back={
                result: result.slice((curPage-1)*pageSize, curPage*pageSize),
                pageCount:pageCount,
                curPage:curPage,
                pretty:true
            };
            res.status(200).send(back).end();
        });
});

/**
 * 查一个文章
 * type:get
 * Parameters: /articel/id || /article/slug
 * Response:{Article}
 */
router.get('/article/:id', function(req, res, next){
    if(!req.params.id){
        return next(new Error('未提供查询字段'));
    }

    let conditions={}; //转换成slug链接 方便SEO
    try{
        conditions._id=mongoose.Types.ObjectId(req.params.id);
    }catch(err){
        conditions.slug=req.params.id;
    }

    db.Article.findOne(conditions)
        .populate('author')
        .populate('category')
        .exec(function(err, result){
        console.log('get article '+ n++, 'params: '+JSON.stringify(req.params));

        if ( err ) throw err;
        res.status(200).send(JSON.stringify(result)).end();
    });
});

/**
 * 点赞一篇文章
 * type:get
 * Parameters: /favorite/id  || /favorite/slug
 * Response:None
 */
router.get('/favorite/:id', function(req, res, next){
    if(!req.params.id){
        return next(new Error('未提供操作条目'));
    }

    let conditions={};
    try{
        conditions._id=mongoose.Types.ObjectId(req.params.id);
    }catch(err){
        conditions.slug=req.params.id;
    }

    db.Article.findOne(conditions)
        .populate('author')
        .populate('category')
        .exec(function(err, result){
            console.log('get article dianzan '+ n++, 'params: '+JSON.stringify(req.params));

            if ( err ) throw err;

            result.meta.favorites=result.meta.favorites ? result.meta.favorites+1 : 1;
            result.markModified('meta');
            result.save(function(err){
                if ( err ) throw err;
                console.log('add article dianzan '+ n++);
                res.status(200).redirect('/userArticle/?id=' + result.slug);
            });
        });
});

/**
 * 评论一篇文章
 * type:post
 * Parameters: /comment/id  || /comment/slug
 * Response:None
 */
router.post('/comment/:id', function(req, res, next){
    if(!req.params.id){
        return next(new Error('未提供操作条目'));
    }

    let conditions={};
    try{
        conditions._id=mongoose.Types.ObjectId(req.params.id);
    }catch(err){
        conditions.slug=req.params.id;
    }

    db.Article.findOne(conditions).exec(function(err, result){
        console.log('get article comment '+ n++, 'params: '+JSON.stringify(req.params));

        if ( err ) throw err;

        let comment={
            author:req.body.author,
            content:req.body.content,
            created:new Date
        };

        result.comments.unshift(comment);
        result.markModified('comments');

        result.save(function(err){
            if ( err ) throw err;
            console.log('add article comment '+ n++);
            //req.flash('info', '评论添加成功');
            res.redirect('/userArticle/?id=' + result.slug);
        });
    });
});

//增文章
router.post("/article", function(req, res){
    let article = new db.Article({
        title:req.body.title,
        content: req.body.content,
        author: req.body.author,
        category:req.body.category,
        created: new Date
    });

    article.save(function(err, result){
        if ( err ) throw err;
        console.log('add article '+ n++);
        res.status(200).send(JSON.stringify(result)).end();
    });
});

//改文章
router.put("/article/:id", function(req, res){
    db.Article.findOne({_id: req.params.id}, function(err, result){
        console.log('modify article ' + n++, 'params: '+JSON.stringify(req.params));

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
    db.Article.findOneAndRemove({_id: req.params.id}, function(err, result){
        console.log('delete article '+ n++, 'params: '+JSON.stringify(req.params));

        if ( err ) throw err;
        //if(result) req.flash('success', '文章删除成功');
        // res.status(200).send(JSON.stringify(result)).end();
        res.status(200).redirect('/adminArticleList');
    });
});



/**
 * 查全部分类
 * Parameters: /category?page=n
 * Response:{
 *      result:[{Article}],
        pageCount:n,
        curPage:n,
 * }
 */
router.get('/category', function(req, res, next){
    console.log('get category list '+ n++);
    db.Category.find({})
        .sort('created')
        .exec(function(err, result){
            if ( err ) throw next(err);

            res.status(200).send(result).end();
        });
});

/**
 * 查单个分类的文章聚合
 * 废弃
 */
router.get('/category/:id', function(req, res, next){
    //res.jsonp(req.params);
    db.Category.findOne({_id: req.params.id}).exec(function(err, category){
        console.log('get category all articles '+ n++,  'params: '+JSON.stringify(req.params));

        if ( err ) throw next(err);

        db.Article.find({category: category, published:true})
            .sort('created')
            .populate('author')
            .populate('category')
            .exec(function (err, articles) {
                if ( err ) throw next(err);

                res.status(200).send(articles).end();
            })
    });
});



/**
 * 后台 查全部文章
 * sort by created
 * inflated the article's ref (author and category)
 * return data to the front
 * query by category and author
 * slice the pages : curPage-current page; pageSize-count pre page; pageCount-total pages
 * sort by
 * type:get
 * Parameters: /articel?page=n
 * Response:{
 *      result:[{Article}],
        pageCount:n,
        curPage:n,
 * }
 */
router.get('/admin/article', function(req, res, next){
    //sort
    let sortby=req.query.sortby ? req.query.sortby : 'created';
    let sortdir=req.query.sortdir ? req.query.sortdir : 'desc';

    if(['title', 'category', 'author', 'created', 'published'].indexOf(sortby)=== -1){
        sortby='created';
    }
    if(['desc', 'asc'].indexOf(sortdir)=== -1){
        sortdir='desc';
    }

    let sortObj={};
    sortObj[sortby]=sortdir;

    db.Article.find({published:true})
        .sort(sortObj)
        .populate('author')
        .populate('category')
        .exec(function(err, result){
            console.log('get article list '+ n++, 'query: '+JSON.stringify(req.query));

            if ( err ) throw next(err);
            let curPage=Math.abs(parseInt(req.query.page||1, 10));
            let pageSize=5;
            let totalCount=result.length;
            let pageCount=Math.ceil(totalCount/pageSize);

            if(curPage>pageCount) curPage=pageCount;

            let back={
                result: result.slice((curPage-1)*pageSize, curPage*pageSize),
                pageCount:pageCount,
                curPage:curPage,
                sortby:sortby,
                pretty:true
            };
            res.status(200).send(back).end();
        });
});

module.exports = router;