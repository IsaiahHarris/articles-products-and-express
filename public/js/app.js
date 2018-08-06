

let articleBody = document.getElementsByClassName('article-body');

for (let i = 0; i < articleBody.length; i++) {
  articleBody[i].addEventListener('click', switchBody);
}

function switchBody() {
  console.log(this);
  if (this.className === 'article-body') {
    this.className = 'active'
  } else if (this.className === 'active') {
    this.className = 'article-body'
  }
}

// let goButton = document.getElementById('ago')

// goButton.addEventListener('click',(req,res)=>{
//   console.log(req);
// })
