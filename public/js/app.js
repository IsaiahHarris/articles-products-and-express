
let articleBody = document.getElementById('article-body');
articleBody.addEventListener('click', function(){
  if(articleBody.id === 'article-body'){
    articleBody.id = 'active'
  }else if(articleBody.id === 'active'){
    articleBody.id = 'article-body'
  }
})