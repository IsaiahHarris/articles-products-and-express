function checkHeader(req,res,next){
  if(req.httpVersion !== '1.1'){
    res.json({ "error": "bad headers" })
  }else {
    next()
  }
}

module.exports ={
  checkHeader
}