const fs = require('fs');
const path = require('path');
//Express is required for creating Node.js based web apps
const express = require('express');
const router = express.Router();

//body-parser is used to parse the Request body and populate the req.
const bodyParser = require('body-parser');

//mongoose is used for interacting with MongoDB
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const resolve = file=>path.resolve(__dirname, file);

const app = express();

app.set('port', (process.env.port || 3300));

//Configuring Express App to make use of BodyParser's JSON parser to parse
//JSON request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const dbHost = 'mongodb://localhost:27017/nodeblog';
mongoose.connect(dbHost);

app.use('/dist', express.static(resolve('../dist')));
app.get('*', function (req, res, next) {
    //console.log(req.originalUrl.indexOf('/article'));
    if(req.originalUrl.indexOf('/article')!=0) {
        const html = fs.readFileSync(resolve('../index.html'), 'utf-8');
        res.send(html);
    }else{
        next();
    }
});


//Connecting to Mongod instance.
mongoose.connection;

//Starting up the server on the port: 3300
app.listen(app.get('port'), function(){
    console.log('Server up: http://localhost:' + app.get('port'));
});




//Create a schema for Article, User, Category
const ArticleSchema = mongoose.Schema({
    title: {type:String, require:true},
    content: {type:String, require:true},
    author: {type:String, require:true},
    category: {type:String, require:true},
    created: {type: Date}
},{versionKey: false});

const UserSchema = mongoose.Schema({
    name: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true},
    created: {type: Date}
});

const CategorySchema = mongoose.Schema({
    title: {type:String, require:true},
    slug: {type:String, require:true},
    created: {type: Date}
});

//Create a Model by using the schema defined above
//Optionally one can provide the name of collection where the instances
//of this model get stored. In this case it is "mongoose_demo". Skipping
//this value defaults the name of the collection to plural of model name i.e books.
const Article = mongoose.model('Article', ArticleSchema);
const User = mongoose.model('User', UserSchema);
const Category = mongoose.model('Category', CategorySchema);




//实现API
let n=0;
//查文章 - 所有
router.get('/article', function(req, res){
    console.log('get article list '+ n++);
    Article.find({}, function(err, result){
        if ( err ) throw err;
        //Save the result into the response object.
        res.status(200).send(JSON.stringify(result)).end();
    });
});

//查文章 - 详情
router.get('/article/:id', function(req, res){
    console.log("get article "+ n++);
    //The parameter in the route is accessed via request.params object.
    Article.findOne({_id: req.params.id}, function(err, result){
        if ( err ) throw err;
        res.status(200).send(JSON.stringify(result)).end();
    });
});

//增文章
router.post("/article", function(req, res){
    console.log('add article '+ n++);
    let article = new Article({
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
    Article.findOne({_id: req.params.id}, function(err, result){
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
    Article.findOneAndRemove({_id: req.params.id}, function(err, result){
        if ( err ) throw err;
        res.status(200).send(JSON.stringify(result)).end();
    });
});

app.use(router);

/*
 {
 "title":"js",
 "content":"js conetent",
 "author":"tom",
 "category":"js"
 }

 {
 "title":"css",
 "content":"css conetent",
 "author":"kettty",
 "category":"css"
 }


 */