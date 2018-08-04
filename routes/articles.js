const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const helpers = require('./helpers')

router.get('/', (req, res) => {
  helpers.getAllArticles(req,res);
});

router.post('/', (req, res) => {
  helpers.addAnArticle(req, res);
});

router.put('/:title', (req, res) => {
  helpers.updateArticle(req, res);
});

router.delete('/:title', (req, res) => {
  helpers.deleteArticle(req, res);
})

router.get('/new', (req, res) => {
  res.render('new')
})
router.get('/:utitle', (req, res) => {
  helpers.selectByTitleArticles(req, res);
})

router.get('/:utitle/edit', (req, res) => {
  helpers.editByTitleArticles(req, res);
})
module.exports = router;