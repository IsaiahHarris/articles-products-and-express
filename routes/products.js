const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const productData = require('../db/productDb');
const payloadValidation = require('../middleware/payloadValidation');

router.get('/', (req, res, next) => {
  res.render('phome', {
    product: productData.allProducts()
  })
})

router.post('/', payloadValidation.validateProductInfo, (req, res) => {
  productData.addProduct(req);
  res.redirect('/products');
})

router.put('/:id', (req, res) => {
  productData.update(req.body.id, req, res);
})

router.delete('/:id', (req, res) => {
  productData.removeProduct(req.params.id, res, req)
})

router.get('/', (req, res) => {
  res.render('pindex', {
    products: productData.allProducts()
  })
})

router.get('/new', (req, res) => {
  res.render('pnew');
})

router.get('/:id', (req, res) => {
  let elem = productData.findId(req.params.id);
  if (elem) {
    res.render('product', {
      product: elem
    })
  } else {
    res.render('pnew', {
      product: req.params
    })
  }
})

router.get('/:id/edit', (req, res) => {
  let elem = productData.findId(req.params.id);
  if (elem) {
    res.render('pedit', {
      product: elem
    })
  } else {
    res.render('pnew');
  }
})

module.exports = router;
