const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const articlesData = require('../db/articlesDb');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  res.render('home', {
    showArticles: true,
    articles: articlesData.all()
  })
})

router.post('/', (req, res, next) => {
  console.log(req.body)
  if (!req.body.title) {
    // res.send('no title');
    res.redirect('/articles/new');
  } else if (!req.body.author) {
    console.log('no author');
    // res.send('no author');
    res.redirect(303, '/articles/new');
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
    console.log('lsadkjf;lk');
    res.redirect(303, `/articles/${title}/edit`);
  } else {
    res.redirect(303, `/articles/${title}`)
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
    res.render(`new`);
  } else {
    res.render('index',{
      article: articlesData.all()
    });
  }
})
/////////////


/////////////

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
  let title = req.params.title;
  articlesData.all().map(element => {
    if (element.title === title) {
      res.render('article', {
        article: element
      })
    }
  })
})

router.get('/:title/edit', (req, res) => {
  res.render('edit');
})


module.exports = router;