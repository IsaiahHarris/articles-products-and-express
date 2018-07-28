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
  if (!req.body.title || !req.body.author) {
    res.redirect('/articles/new');
  } else {
    articlesData.add(req.body);
    res.redirect('/articles');
  }
})

router.put('/:title', (req, res, next) => {
  articlesData.update(req.params.title, req, res);
})

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
  res.render('new');
})

router.get('/:title', (req, res) => {
  let elem = articlesData.findTitle(req.params.title);
  if (elem) {
    res.render('article', {
      article: elem
    })
  } else {
    res.render('new', {
      article: req.params
    });
  }
})

router.get('/:title/edit', (req, res) => {
  let elem = articlesData.findTitle(req.params.title);
  if (elem) {
    res.render('edit', {
      article: elem
    })
  } else {
    res.render('new');
  }
})

module.exports = router;