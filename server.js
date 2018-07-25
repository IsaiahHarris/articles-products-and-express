const express = require('express');
const app = express();
const products = require('./db/products');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;


app.get('/', (req, res)=>{
  res.send('smoke');
})

app.use('/products', products);

app.get('*', (req, res)=>{
  console.log('WRECKED');
})

app.use((err, req, res, next)=>{
  console.log(err);
  res.status(500).send('error');
})

app.listen(PORT,()=>{
  console.log('listening to port ' + PORT)
})