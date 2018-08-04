const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const helpers = require('../routes/helpers');
router.get('/', (req, res) => {
  helpers.selectAllProducts(req, res);
});

router.post('/', (req, res) => {
  helpers.addProduct(req, res);
});

router.put('/:id', (req, res) => {
  helpers.updateArticle(req, res);
});

router.delete('/:id', (req, res) => {
  helpers.deleteProduct(req, res);
});

router.get('/new', (req, res) => {
  res.render('pnew');
});

router.get('/:id', (req, res) => {
  helpers.getProductById(req, res);
});

router.get('/:id/edit', (req, res) => {
 helpers.getProductEditPage(req,res);
})

module.exports = router;

