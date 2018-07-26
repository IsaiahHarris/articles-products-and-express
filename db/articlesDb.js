const articleCollection = [{id: 0, name: 'shoe', price:70, inventory: 0}];

function all(){
  return articleCollection;
}

function add(item){
  articleCollection.push(item);
}
function createId(){
  return Math.floor((Math.random)*100 + 1);
}
module.exports = {
  all:all,
  add:add
}