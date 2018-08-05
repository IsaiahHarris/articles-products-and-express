let errorMessage = '';

const helpers = require('../routes/helpers');





function validateArticleInfo(req, res, next) {
  let title = req.body.title;
  let author = req.body.author;
  let body = req.body.body;
  let noTitleMessage = 'Missing Title';
  let noAuthorMessage = 'Missing Author';
  let noBodyMessage = 'Missing Body';
  helpers.duplicate(req.body)
    .then(result => {
      if (result.length) {
        return res.render('new', {
          aAlreadyExists: true,
          alreadyExists: 'article under that title already exists'
        })
      } else if (!title) {
        return res.render('new', {
          noTitle: true,
          noTitleMessage: noTitleMessage
        })
      } else if (!author) {
        res.render('new', {
          noAuthor: true,
          noAuthorMessage: noAuthorMessage,
        })
      } else if (!body) {
        return res.render('new', {
          noBody: true,
          noBodyMessage: noBodyMessage,
        })
      } else {
        next();
      }
    })
};

function validateProductInfo(req, res, next) {
  let success = false;
  if (!req.body.name || isNaN(parseInt(req.body.price)) || !req.body.price || isNaN(parseInt(req.body.inventory)) || !req.body.inventory) {
    errorMessage = 'ALL FIELDS MUST BE FILLED OUT, PRICE AND INVENTORY MUST BE NUMBERS';
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
  validateProductInfo,
}

