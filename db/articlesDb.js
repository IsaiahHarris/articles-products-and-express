const articleCollection = [{author: 'bob', body: 'ksbdaldjh', title:'bobtitle'}];

function all(){
  return articleCollection;
}

function add(item){
    item.urlTitle = encodeURI(item.title)
    articleCollection.push(item);
}
function createId(){
  return Math.floor(Math.random() * 6) + 1  
}
function remove(element){
    articleCollection.splice(element, 1);
}
module.exports = {
  all:all,
  add:add,
  remove:remove
}