const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const validation = require('../middleware/payloadValidation');

router.get('/', (req,res)=>{
  const data = req.body;
  return db.raw('SELECT * FROM products')
  .then(result=>{
    return res.json(result.rows);
  })
  .catch(err=>{
    console.log(err);
    res.send('there has been an error');
  })
})

router.post('/', validation.validateProductInfo, (req,res)=>{
  const data = req.body;
  return db('products').insert({
    name: data.name, 
    price: data.price, 
    inventory:data.inventory, 
  })
  .then(result=>{
    return res.json({"message": "success"});
  })
  .then(result=>{
    return res.json(result.rows);
  })
});

router.put('/:id', (req,res)=>{
  const data = req.body;
  const id = req.params.id;
  return db('products').where('id', '=', id).update({
    id: id,
    name: data.name,
    price: data.price,
    inventory: data.inventory,
  })
  .then(result=>{
    return res.json(result.rows)
  })
  .catch(err=>{
    console.log(err);
    res.send('there has been an error');
  })
})
router.delete('/:id', (req,res)=>{
  const id = req.params.id;
  return db.raw('SELECT * FROM products WHERE id = ?', [id])
    .then(result => {
      if (!result || !result.rowCount) {
        return res.status(404).json({ "message": "Product under that id could not be found" })
      }
      return result;
  })
  .then(result=>{
    return db('products').where('id', '=', id).del();
  })
  .then(result=>{
    return res.json({"message": `product ${id} has been successfully deleted`});
  })
  .catch(err=>{
    console.log(err);
    res.send('there has been an error');
  })
})


module.exports = router;

