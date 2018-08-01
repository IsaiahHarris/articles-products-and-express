let id = 1;
const productCollection = [{ name: 'shoe', price: '50', inventory: '5', id : '0'}]
let errorMessage = 'ITEM DOESNT EXIST, do you want to add it?';
function allProducts() {
  return productCollection;
}

function addProduct(req) {
  let newProduct = {};
  newProduct.id = id++;
  newProduct.name = req.body.name;
  newProduct.price = Number(req.body.price);
  newProduct.inventory = Number(req.body.inventory);
  productCollection.push(newProduct);
}

function removeProduct(id, res, req) {
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
    res.render('pnew', {
      errorMessage: errorMessage,
      productName: req.params
    })
  } else {
    res.redirect('/products');
  }
}

function findId(id) {
  let elem;
  productCollection.map(element => {
    if (element.id === id) {
      elem = element
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
      itemFound = true;
    }
  })
  //move
  if (itemFound === false) {
    itemfound = true;
    res.redirect(`/products/${title}/edit`)
  } else {
    res.redirect('/products');
  }
}

module.exports = {
  allProducts,
  // productIdGenerator,
  addProduct,
  findId,
  update,
  removeProduct
}