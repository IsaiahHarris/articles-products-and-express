const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const articlesData = require('../db/articlesDb');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/', (req, res, next)=>{
  res.render('home', {
    showArticles: true,
    articles: articlesData.all()
  })
})

module.exports = router;
