const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const productData = require('../db/productDb');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req,res)=>{
  res.render('pIndex', {
    product: productData.allProducts()
  });
})

router.post('/', (req,res)=>{
  if (!req.body.name || !req.body.price || !req.body.inventory) {
    res.redirect('/products/new');
  } else {
    articlesData.add(req.body);
    res.redirect('/products');
  }
})

router.get('/new', (req, res) => {
  res.render('pnew');
})

module.exports = router;
