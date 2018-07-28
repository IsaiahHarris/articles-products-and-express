const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
const articlesRoute = require('./routes/articles');
const productsRoute = require('./routes/products');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.get('/', (req, res, next)=>{
  res.send('you got'+ articlesRoute.all());
})

app.engine('.hbs',exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use('/articles', articlesRoute)
app.use('/products', productsRoute)

app.listen(PORT, ()=>{
console.log('server listening to', PORT)
})