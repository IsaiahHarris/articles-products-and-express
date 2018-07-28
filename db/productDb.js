const productCollection = [{ name : 'shoe', price : '50', inventory : '5' }]

function allProducts() {
  return productCollection;
}

function productIdGenerator(){
  return Math.floor(Math.random() * 6) + 1
}

function addProduct (req){
  let newProduct = {};
  newProduct.id = productIdGenerator();
  newProduct.name = req.name;
  newProduct.price = Number(req.price);
  newProduct.inventory = Number(req.inventory);
  productCollection.push(newProduct);
}

module.exports = {
  allProducts,
  productIdGenerator,
  addProduct
}