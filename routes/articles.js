const express = require('express');
const router = express.Router();
const helpers = require('./helpers')
const payloadValidation = require('../middleware/payloadValidation');

router.get('/', (req, res) => {
  helpers.getAllArticles(req,res);
});

router.post('/', payloadValidation.validateArticleInfo, (req, res) => {
  helpers.addAnArticle(req, res);
});

router.put('/:utitle', (req, res) => {
  helpers.updateArticle(req, res);
});

router.delete('/:utitle/', (req, res) => {
  helpers.deleteArticle(req, res);
})

router.get('/new', (req, res) => {
  res.render('new')
})
router.get('/:utitle', (req, res) => {
  helpers.selectByTitleArticles(req, res);
})

router.get('/:utitle/edit', (req, res) => {
  helpers.getArticleEditPage(req, res);
})

module.exports = router;