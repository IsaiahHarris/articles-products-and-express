const productData = require('../db/productDb');
const articleData = require('../db/articlesDb');

let errorMessage;


function validateArticleInfo(req, res, next) {
  let success = false;
  if (!req.body.title || !req.body.author || !req.body.body) {
    errorMessage = 'ALL FIELDS MUST BE FILLED OUT';
  }else {
    success = true;
  }
  if(success === false){
    res.render('new',{
      errorMessage: errorMessage
    })
  }else {
    next();
  }
  
}

module.exports = {
  validateArticleInfo
}

