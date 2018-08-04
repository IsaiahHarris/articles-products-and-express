const db = require('../db/knex');

function selectArticles(title){
  return db.select().from('articles').where('title', title)
}
function selectProducts(id){
  return db.select().from('products').where('id', id)
}

module.exports = {
  selectArticles,
  selectProducts
}