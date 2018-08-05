const db = require('../db/knex');

function selectByTitleArticles(req, res) {
  const title = encodeURI(req.params.utitle);
  return db.select().from('articles').where('urltitle', title)
    .then(result => {
      console.log(result);
      if (!result || !result.length) {
        res.redirect('/articles/new')
      } else {
        return res.render('article', {
          article: result[0]
        })
      }
    })
}
function selectProducts(id) {
  return db.select().from('products').where('id', id)
}

function getAllArticles(req, res) {
  return db.select().from('articles')
    .then(result => {
      res.render('home', {
        articles: result
      })
    })
}

function addAnArticle(req, res) {
  const data = req.body;
  return db('articles').insert({
    title: data.title,
    body: data.body,
    author: data.author,
    urltitle: encodeURI(data.title)
  })
    .then(result => {
      res.redirect('/articles')
    })
    .catch(err=>{
      console.log(err);
    })
}
function updateArticle(req, res) {
  console.log('getting')
  const title = encodeURI(req.params.utitle);
  const data = req.body;

  return db('articles').where('urltitle', title).update({
    title: data.title,
    body: data.body,
    author: data.author,
    urltitle: encodeURI(data.title)
  })
    .then(result => {
      res.redirect(`/articles/${data.title}`)
    })
    .catch(err=>{
      console.log(err);
    })
}

function deleteArticle(req, res) {
  const title = encodeURI(req.params.utitle);
  db.select().from('articles').where('urltitle', title)
    .then(result => {
    return db('articles').where('urltitle', title).del()
  })
    .then(result => {
      res.redirect('/articles')
    })
    .catch(err => {
      console.log(err);
      res.send('there has been an error');
    })
}

function getArticleEditPage(req, res) {
  const title = encodeURI(req.params.utitle);
  db.select().where('title', title).from('articles')
    .then(result => {
      res.render('edit', {
        article: result[0]
      })
    })
}

function selectAllProducts(req,res){
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
}

function addProduct(req,res){
  const data = req.body;
  return db('products').insert({
    name: data.name,
    price: data.price,
    inventory: data.inventory,
  })
    .then(result => {
      res.redirect('/products')
    })
}

function updateProduct(req,res){
  console.log('second');
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
}

function deleteProduct(req,res){
  const id = req.params.id;
  return db.raw('SELECT * FROM products WHERE id = ?', [id])
    .then(result => {
      return db('products').where('id', id).del()
    })
    .then(result => {
      res.redirect('/products')
    })
    .catch(err => {
      console.log(err);
      res.send('there has been an error');
    })
}
function getProductById(req,res){
  const id = req.params.id;
  return db.select().from('products').where('id', id)
    .then(result => {
      if (!result || !result.length) {
        res.redirect('/products/new')
      } else {
        return res.render('product', {
          product: result[0]
        })
      }
    })
    .catch(err => {
      console.log(err);
      return res.send('there has been an error')
    })
}

function getProductEditPage(req,res){
  const id = req.params.id;
  db.select().where('id', id).from('products')
    .then(result => {
      res.render('pedit', {
        product: result[0]
      })
    })
    .catch(err => {
      res.send('there has been an error')
    })
}

module.exports = {
  selectByTitleArticles,
  selectProducts,
  getAllArticles,
  addAnArticle,
  updateArticle,
  deleteArticle,
  getArticleEditPage,
  selectAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductEditPage
}