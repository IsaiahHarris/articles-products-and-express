const productData = require('../db/productDb');
const articleData = require('../db/articlesDb');

let isValid;
let product;
let renderRoute;

function validateProduct(req,res,next){
  const name = req.body.name;
  const price = req.body.price;
  const inventory = req.body.inventory

  isValid = true;

  if(req.params.id){
    product = productData.findId(req.params.id);
  }

  setRenderRoute(req, 'products');


}

function setRenderRoute(req, resource) {
  if (req.method === 'POST') {
    renderRoute = `${resource}/new`;
  } else if (req.method === 'PUT') {
    renderRoute = `${resource}/edit`;
  }
}