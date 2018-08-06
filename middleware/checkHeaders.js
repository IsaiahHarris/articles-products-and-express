function checkHeader(req,res,next){
  // console.log(req.header.version)
  if(req.httpVersion !== '1.1'){
    res.json({ "error": "bad headers" })
  }else {
    next()
  }
}

module.exports ={
  checkHeader
}