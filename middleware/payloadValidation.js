const productData = require('../db/productDb');
const articleData = require('../db/articlesDb');

let errorMessage;

function validateArticleInfo(req, res, next) {
  let success = false;
  if (!req.body.title || !req.body.author || !req.body.body) {
    errorMessage = 'ALL FIELDS MUST BE FILLED OUT';
  } else {
    success = true;
  }
  if (success === false) {
    res.render('new', {
      errorMessage: errorMessage
    })
  } else {
    next();
  }
}

function validateProductInfo(req, res, next) {
  let success = false;
  if (!req.body.name || isNaN(parseInt(req.body.price)) || !req.body.price || isNaN(parseInt(req.body.inventory)) || !req.body.inventory) {
    errorMessage = 'ALL FIELDS MUST BE FILLED OUT';
  } else {
    success = true;
  }
  if (success === false) {
    res.render('pnew', {
      errorMessage: errorMessage
    })
  } else {
    next();
  }
}

module.exports = {
  validateArticleInfo,
  validateProductInfo
}

