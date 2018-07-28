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
  let title = req.params.title;
  articlesData.all().map(element => {
    if (element.title === title) {
      element.title = req.body.title
      itemFound = true;
    }
  })
  if (itemFound === false) {
    res.redirect(303, `/articles/${title}/edit`);
  } else {
    res.render('edit', {
      article: articlesData.all()
    })
  }
})

let deleted = false;

router.delete(`/:title`, (req, res) => {
  let title = req.params.title;
  articlesData.all().map(element => {
    if (element.title === title) {
      articlesData.remove(element)
      deleted = true;
    }
  })
  if (deleted === false) {
    res.redirect(`/articles/new`);
  } else {
    res.redirect('/articles')
  }
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

let getTitle = false;

router.get('/:title', (req, res) => {
  let foundTitle = articlesData.findTitle(req.params.title);
  getTitle = true;
  if (getTitle) {
    res.render('article', {
      article: foundTitle
    })
  } else {
    res.redirect('new');
  }
})

router.get('/:title/edit', (req, res) => {
  let foundTitle = articlesData.findTitle(req.params.title);
  res.render('edit', {
    article: foundTitle
  })
})

module.exports = router;