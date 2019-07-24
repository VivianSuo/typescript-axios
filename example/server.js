const express = require("express");
const bodyParse = require("body-parser");
const cookieParser = require("cookie-parser");
const multipart = require('connect-multiparty');
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");
const path = require("path");
const atob = require('atob');

const app = express()
const compiler = webpack(webpackConfig)
const router = express.Router()

// 浏览器开发环境中将编译工作转交给webpackDevMiddleware来实现在内存中，并未生成真正的__build__文件，生产环境下js文件利用webpack已经打包到来output.publicpath中，所以开发环境中也要在内存中指定js文件的位置
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats:{
    colors: true,
    chunks: false
  }
}))
// 开发环境中编译工作添加热加载工作
app.use(webpackHotMiddleware(compiler))

// 静态文件以当前文件为请求跟目录路径
// app.use(express.static(__dirname))

app.use(bodyParse.json())

app.use(bodyParse.urlencoded({extended: true}))

app.use(cookieParser())

app.use(express.static(__dirname,{
  setHeaders(res){
    res.cookie('XSRF-TOKEN-D','12345abc')
  }
}))

// 中间件作用处理上传请求并指定上传的目录
app.use(multipart({
  uploadDir:path.resolve(__dirname,'upload-file')
}))
const port = process.env.PORT || 8083

router.get("/simple/get",(req,res)=>{
  res.json({
    msg: "hello world"
  })
})
router.get("/base/get", (req, res) => {
  res.json(req.query)
})

router.post('/base/post',(req,res)=>{
  res.json(req.body)
})

router.post('/base/buffer',(req,res)=>{
  let msg = [];
  req.on('data',chunk=>{
    msg.push(chunk)
  })
  req.on('end',()=>{
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get',(req,res)=>{
  if(Math.random() > 0.5){
    res.json({
      msg:'ok lalala'
    })
  }else{
    res.status(500);
    res.end()
  }
})

router.get('/error/timeout',(req,res)=>{
  setTimeout(()=>{
    res.json({
      msg:" i'm timeout"
    })
  },3000)
})

router.post('/extend/post',(req,res)=>{
  res.json({
    msg:'haha post'
  })
})
router.get('/extend/get', (req, res) => {
  res.json({
    msg: 'haha get'
  })
})
router.all('/extend/delete',(req,res,next)=>{
  res.json({
    msg: 'delete'
  })
  next()
})
router.all('/extend/options',(req,res,next)=>{
  res.json({
    msg:'options'
  })
  next()
})
router.all('/extend/put',(req,res,next)=>{
  res.json({
    msg:'put'
  })
  next()
})

router.get('/extend/user',(req,res)=>{
  res.json({
    code:200,
    message:'ok',
    result:{
      name: 'zhangsan',
      age: 22
    }
    
  })
})

router.get('/interceptor/get',(req,res)=>{
  res.json({
    data:0
  })
})

router.post('/config/post',(req,res)=>{
  res.json({
    data:1
  })
})

router.get("/cancel/get",(req,res)=>{
  res.json({
    data:'ok'
  })
})

router.post("/cancel/post",(req,res)=>{
  res.json({
    data:'perfect'
  })
})

router.get('/more/get',(req,res)=>{
  // res.set(cors)
  
  res.json(req.cookies)

})

router.post('/progress/upload',(req,res)=>{
  console.log(req.body,req.files)
  res.end('upload success')
})

router.post('/authorization/post',(req,res)=>{
  console.log(req.headers)
  const auth = req.headers.authorization;
  const [type, credentials] = auth.split(' ');
  console.log(atob(credentials)) // base64解码
  const [username,password] = atob(credentials).split(':');
  if (type === 'Basic' && username === 'hahalia' && password === '323423d'){
    res.json({
      ok:true,
      username,
      password,
      usernameAndPasswordByBase64:credentials
    })
  }else{
    res.end("UnAuthorization")
  }
})
app.use(router)






module.exports = app.listen(port, ()=>{
  console.log(`server listening on http://localhost:${port}`)
})


