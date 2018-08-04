const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const helpers = require('./helpers')

router.get('/', (req, res) => {
  return db.select().from('articles')
    .then(result => {
      res.render('home', {
        articles: result
      })
    })
});

router.post('/', (req, res) => {
  const data = req.body;
  return db('articles').insert({
    title: data.title,
    body: data.body,
    author: data.author,
  })
    .then(result => {
      res.redirect('/articles')
    })
});

router.put('/:title', (req, res) => {
  const title = req.params.title;
  const data = req.body;

  return db('articles').where('title', title).update({
    title: data.title,
    body: data.body,
    author: data.author
  })
    .then(result => {
      res.redirect(`/articles/${data.title}`)
    })
});

router.delete('/:title', (req, res) => {
  const title = req.params.title;
  helpers.selectArticles(title)
    .then(result => {
      return db('articles').where('title', title).del()
    })
    .then(result => {
      res.redirect('/articles')
    })
    .catch(err => {
      console.log(err);
      res.send('there has been an error');
    })
})
router.get('/new', (req, res) => {
  res.render('new')
})
router.get('/:title', (req, res) => {
  const title = req.params.title;
  console.log(title);
  // console.log(helpers.selectArticles(title))

  helpers.selectArticles(title)
    .then(result => {
      console.log(result);
      if (!result || !result.length) {
        res.redirect('/articles/new')
      } else {
        return res.render('article', {
          article: result[0]
        })
      }
    })
})

router.get('/:title/edit', (req, res) => {
  const title = req.params.title;
  db.select().where('title', title).from('articles')
    .then(result => {
      res.render('edit', {
        article: result[0]
      })
    })
})
module.exports = router;