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
}
function updateArticle(req, res) {
  const title = encodeURI(req.params.title);
  const data = req.body;

  return db('articles').where('title', title).update({
    title: data.title,
    body: data.body,
    author: data.author,
    urltitle: encodeURI(data.title)
  })
    .then(result => {
      res.redirect(`/articles/${data.title}`)
    })
}

function deleteArticle(req, res) {
  const title = encodeURI(req.params.title);
  db.select().from('articles').where('urltitle', title)
    .then(result => {
    return db('articles').where('title', title).del()
  })
    .then(result => {
      res.redirect('/articles')
    })
    .catch(err => {
      console.log(err);
      res.send('there has been an error');
    })
}

function editByTitleArticles(req, res) {
  const title = encodeURI(req.params.utitle);
  db.select().where('title', title).from('articles')
    .then(result => {
      res.render('edit', {
        article: result[0]
      })
    })
}

module.exports = {
  selectByTitleArticles,
  selectProducts,
  getAllArticles,
  addAnArticle,
  updateArticle,
  deleteArticle,
  editByTitleArticles
}