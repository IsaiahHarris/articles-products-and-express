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

router.post('/', (req, res, next)=>{
  if(!req.body.title){
    res.send('no title')
    res.redirect('/articles/new')
  }else if(!req.body.author){
    res.send('no author')
    res.redirect('/articles/new')
  }else {
      articlesData.add(req.body)
      res.redirect('/articles');
  }
})

router.put('/:title', (req,res,next)=>{
  let title = req.params.title;
  articlesData.all().map(element =>{
    if(element.title === title){
      element.title = req.body.title
    }
  })
  res.redirect('/articles');
})

router.delete(`/:title`, (req, res) => {
  let title = req.params.title;
  for (let i = 0; i < articlesData.all().length; i++){
    if (title === articlesData.all()[i].title){
      articlesData.remove(i);
    }
  }
  res.redirect('/articles');
})

module.exports = router;
