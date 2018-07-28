const articleCollection = [{ author: 'bob', body: 'ksbdaldjh', title: 'bobtitle' }];

function all() {
  return articleCollection;
}

function add(item) {
  item.urlTitle = encodeURI(item.title)
  articleCollection.push(item);
}

function createId() {
  return Math.floor(Math.random() * 6) + 1
}

function remove(title, res) {
  let deleted = false
  articleCollection.map(element => {
    if (element.title === title) {
      let index = articleCollection.indexOf(element)
      articleCollection.splice(index, 1);
      deleted = true;
    }
  })
  if (deleted === false) {
    deleted = true;
    res.redirect(`/articles/new`);
  } else {
    res.redirect('/articles')
  }


}

function findTitle(title) {
  let elem;
  articleCollection.map(element => {
    if (element.title === title) {
      elem = element
      getTitle = true
    }
  })
  return elem;
}

module.exports = {
  all,
  add,
  remove,
  findTitle,
}