const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const validation = require('../middleware/payloadValidation');

router.get('/', (req, res) => {
  db.select().from('products')
    .then(result => {
      res.render('phome', {
        product: result
      });
    })
    .catch(err => {
      console.log(err);
      res.send('there has been an error');
    })
});

router.post('/', validation.validateProductInfo, (req, res) => {
  const data = req.body;
  return db('products').insert({
    name: data.name,
    price: data.price,
    inventory: data.inventory,
  })
    .then(result => {
      res.redirect('/products')
    })
});

router.put('/:id', (req, res) => {
  const data = req.body;
  const id = req.params.id;
  return db('products').where('id', '=', id).update({
    id: id,
    name: data.name,
    price: data.price,
    inventory: data.inventory,
  })
    .then(result => {
      res.redirect(`/products/${id}`)
    })
    .catch(err => {
      console.log(err);
      res.send('there has been an error');
    })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return db.raw('SELECT * FROM products WHERE id = ?', [id])
    .then(result => {
      return db('products').where('id', id).del()
    })
    .then(result=>{
      res.redirect('/products')
    })
    .catch(err => {
      console.log(err);
      res.send('there has been an error');
    })
});

router.get('/new', (req, res) => {
  res.render('pnew');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return db.select().from('products').where('id', id)
    .then(result => {
      res.render('product', {
        product: result[0]
      })
    })
    .catch(err => {
      return res.send('there has been an error')
    })
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  db.select().where('id', id).from('products')
    .then(result => {
      res.render('pedit', {
        product: result[0]
      })
    })
    .catch(err=>{
      res.send('there has been an error')
    })
})

module.exports = router;

