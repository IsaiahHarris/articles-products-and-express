let errorMessage = '';

function validateArticleInfo(req, res, next) {
  let title = req.body.title;
  let author = req.body.author;
  let body = req.body.body;
  let noTitleMessage = 'Missing Title';
  let noAuthorMessage = 'Missing Author';
  let noBodyMessage = 'Missing Body';
  if (!title) {
    res.render('new', {
      noTitle: true,
      noTitleMessage: noTitleMessage
    })
  }else if(!title && !body){
    res.render('new', {
      noBody :true,
      noBodyMessage: noBodyMessage,
      noTitle: true,
      noTitleMessage: noTitleMessage
    })
  }else if(!title && !author){
    res.render('new', {
      noAuthor :true,
      noAuthorMessage: noAuthorMessage,
      noTitle: true,
      noTitleMessage: noTitleMessage
    })
  }else if(!body){
    res.render('new', {
     noBody: true,
     noBodyMessage: noBodyMessage
    })
  }else if(!author && !body){
    res.render('new', {
      noAuthor: true,
      noAuthorMessage: noAuthorMessage,
      noBody:true,
      noBodyMessage: noBodyMessage
     })
  }else if(!author){
    res.render('new',{
      noAuthor:true,
      noAuthorMessage: noAuthorMessage
    })
  }else if(!title && !body && !noAuthor){
    res.render('new', {
      noBody :true,
      noBodyMessage: noBodyMessage,
      noTitle: true,
      noTitleMessage: noTitleMessage,
      noAuthor: true,
      noAuthorMessage: true
    })
  }else {
    next();
  }
}

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
  validateProductInfo
}

