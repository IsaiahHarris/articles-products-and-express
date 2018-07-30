
let articleBody = document.getElementsByClassName('article-body');

for (let i = 0; i < articleBody.length; i++) {
  console.log(articleBody[i]);
  articleBody[i].addEventListener('click', switchDaStuff);

}
function switchDaStuff() {

    
  
  if (this.className === 'article-body') {
    this.className = 'active'
  } else if (this.className === 'active') {
    this.className = 'article-body'
  }
}
