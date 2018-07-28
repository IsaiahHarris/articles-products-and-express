const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const articlesData = require('../db/articlesDb');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  res.render('home', {
    articles: articlesData.all()
  })
})

router.post('/', (req, res, next) => {
  console.log(req.body)
  if (!req.body.title || !req.body.author) {
    res.redirect('/articles/new');
  } else {
    articlesData.add(req.body);
    res.redirect('/articles');
  }
})

let itemFound = false;

router.put('/:title', (req, res, next) => {
  console.log('/:title');
  let title = req.params.title;
  articlesData.all().map(element => {
    if (element.title === title) {
      element.title = req.body.title
      element.author = req.body.author
      element.body = req.body.body;
      itemFound = true;
    }
  })
  if (itemFound === false) {
    res.redirect(303, `/articles/${title}/edit`);
  } else {
    res.redirect('/articles');
  }
})

let deleted = false;

router.delete(`/:title`, (req, res) => {
  articlesData.remove(req.params.title, res);
})

router.get('/', (req, res) => {
  res.render('index', {
    showArticles: true,
    articles: articlesData.all()
  })
})

router.get('/new', (req, res) => {
  console.log('this is new');
  res.render('new');
})

router.get('/:title', (req, res) => {
  let elem = articlesData.findTitle(req.params.title);
  if(elem){
    res.render('article',{
      article:elem
    })
  }else {
    res.render('new');
  }
})

router.get('/:title/edit', (req, res) => {
  let elem = articlesData.findTitle(req.params.title);
  if(elem){
    res.render('edit', {
      article: foundTitle
    })
  }else {
    res.render('new');
  }
  
})

module.exports = router;