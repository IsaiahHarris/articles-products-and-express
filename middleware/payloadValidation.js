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
  helpers.duplicateProduct(req.body)
    .then(result => {
      if (result.length) {
        return res.render('pnew', {
          pAlreadyExists: true,
          pAlreadyExistsMessage: 'Product under that title already exists'
        })
      } else if (!req.body.name) {
        return res.render('pnew', {
          noName: true,
          noNameMessage: 'Missing Name'
        })
      } else if (!req.body.inventory || isNaN(req.body.inventory)) {
        res.render('pnew', {
          noInventory: true,
          noInventoryMessage: 'Inventory Must Be Present And A Number'
        })
      } else if (!req.body.price || isNaN(req.body.price)) {
        return res.render('pnew', {
          noPrice: true,
          noPriceMessage: 'Price Must Be Present And A Number',
        })
      } else {
        next();
      }
    })
}

module.exports = {
  validateArticleInfo,
  validateProductInfo,
}

