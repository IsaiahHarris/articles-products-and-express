const express = require('express');
const router = express.Router();
const db = require('../db/knex');



router.get('/', (req,res)=>{
  return db.select().from('articles')
  .then(result=>{
    res.render('home',{
      article: result
    })
  })
})

module.exports = router;