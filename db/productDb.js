const productCollection = [{ name: 'shoe', price: '50', inventory: '5' }]

function allProducts() {
  return productCollection;
}

function productIdGenerator() {
  return Math.floor(Math.random() * 6) + 1
}

function addProduct(req) {
  let newProduct = {};
  newProduct.id = productIdGenerator();
  newProduct.name = req.name;
  newProduct.price = Number(req.price);
  newProduct.inventory = Number(req.inventory);
  productCollection.push(newProduct);
}

function removeProduct(id, res) {
  let deletedProduct = false;
  productCollection.map(element => {
    if (element.id === id) {
      let productIndex = productCollection.indexOf(element);
      productCollection.splice(productIndex, 1)
      deletedProduct = true;
    }
  })
  if (deletedProduct === false) {
    deletedProduct = true;
    res.redirect('products/new');
  } else {
    res.redirect('/products');
  }
}

function findId(id) {
  let elem;
  productCollection.map(element => {
    if (element.id === id) {
      elem = element
      getId = true
    }
  })
  return elem;
}

function update(id, req, res) {
  productCollection.map(element => {
    if (element.id === id) {
      element.name = req.body.name;
      element.price = req.body.price;
      element.inventory = req.body.inventory;
      element.id = req.body.id;
      itemFound = true;
    }
  })
  if (itemFound === false) {
    itemfound = true;
    res.redirect(`/products/${title}/edit`)
  } else {
    res.redirect('/products');
  }
}

module.exports = {
  allProducts,
  productIdGenerator,
  addProduct,
  findId,
  update,
  removeProduct
}