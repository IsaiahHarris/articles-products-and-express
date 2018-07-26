const express = require('express');

const bodyParser = require('body-parser');
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
let productArr = [];
router.post('/', (req, res, next)=>{
  const newProduct = {}
  newProduct.id = generateId();
  newProduct.name = req.body.name;
  newProduct.price = Number(req.body.price);
  newProduct.inventory = Number(req.body.inventory);
  productArr.push(newProduct);
  console.log(newProduct);
  res.send('success');
})

function generateId(){
 let randomId = Math.floor(Math.random() * 500) + 1  
 return randomId;
}

module.exports = router;
