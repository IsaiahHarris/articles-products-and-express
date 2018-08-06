const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
const articlesRoute = require('./routes/articles');
const productsRoute = require('./routes/products');
const logger = require('morgan');
const PORT = process.env.PORT || 8080;
const analyticsTracker = require('./middleware/analytics');
const checkHeaders = require('./middleware/checkHeaders');

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

logger.token('date', function(){
  return new Date().toISOString()
})

app.use(logger({format: ":method :url :date[iso]", stream: analyticsTracker.accessLogStream()}))

app.get('/' , (req, res, next) => {
  checkHeaders.checkHeader(req,res)
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