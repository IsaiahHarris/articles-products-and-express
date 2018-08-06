const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
const articlesRoute = require('./routes/articles');
const productsRoute = require('./routes/products');
const time = require('express-timestamp');
const fs = require('fs');
const logger = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 8080;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

const now = new Date();
const logfile_name = now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate() +'.log'
const accessLogStream = fs.createWriteStream(path.join(__dirname, `./logs/${logfile_name}`), {flags: 'a'})

logger.token('date', function(){
  return new Date().toISOString()
})

app.use(logger({format: ":method :url :date[iso]", stream: accessLogStream}))

app.get('/', (req, res, next) => {
  res.render('landingPage');
})

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use('/articles', articlesRoute)
app.use('/products', productsRoute)

app.listen(PORT, () => {
  console.log('server listening to', PORT)
})