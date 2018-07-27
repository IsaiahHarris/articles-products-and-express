const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const articlesRoute = require('./routes/articles');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res, next)=>{
  res.send('you got'+ articlesRoute.all());
})

app.engine('.hbs',exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', '.hbs');


app.use('/articles', articlesRoute)

app.listen(PORT, ()=>{
console.log('server listening to', PORT)
})