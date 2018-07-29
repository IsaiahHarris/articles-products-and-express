const articleCollection = [{ author: 'bob', body: 'Lorizzle ipsum dolizzle sit brizzle, consectetuer adipiscing elit. Nullizzle yo velizzle, fo shizzle volutpizzle, arzipizzle shizznit, gravida boofron, arcu. Pellentesque eget tortor. Dope erizzle. Black izzle dizzling dapogizzle gangster Tempus tempizzle. Mauris pellentesque fresh funky we gonna chung turpizzle. Ass izzle i saw beyonce tizzles and my pizzle went crizzle. Pellentesque eleifend rhoncizzle things. In fizzle you have a bizzle platea daahng dawg. Donec dapibizzle. Mofo tellizzle urna, gangsta izzle, mattis boofron, eleifend gangsta, nunc. I saw beyonces tizzles and my pizzle went to cryzzle aroused. Integer pimpin,', title: 'bobtitle' }];

function all() {
  return articleCollection;
}

function add(item) {
  item.urlTitle = encodeURI(item.title)
  articleCollection.push(item);
}

function update(title, req, res) {
  articleCollection.map(element => {
    if (element.title === title) {
      element.title = req.body.title
      element.author = req.body.author
      element.body = req.body.body;
      itemFound = true;
    }
  })
  if (itemFound === false) {
    itemFound = true
    res.redirect(303, `/articles/${title}/edit`);
  } else {
    res.redirect('/articles');
  }
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
  update
}