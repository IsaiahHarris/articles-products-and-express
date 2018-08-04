const express = require('express');
const router = express.Router();
const db = require('../db/knex');



router.get('/', (req, res) => {
  return db.select().from('articles')
    .then(result => {
      res.render('home', {
        article: result
      })
    })
});

router.post('/', (req, res) => {
  const data = req.body;
  return db('products').insert({
    title: data.title,
    body: data.body,
    author: data.author,
  })
    .then(result => {
      res.redirect('/products')
    })
});

router.put('/:title', (req,res)=>{
  const title = req.params.title;
  const data = req.body;

  return db('products').where('title', title).update({
    id:id,
    title: data.title,
    body: data.body,
    author: data.author
  })
  .then(result=>{
    res.redirect(`articles/${id}`)
  })
})

module.exports = router;