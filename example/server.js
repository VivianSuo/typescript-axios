const express = require("express");
const bodyParse = require("body-parser");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");

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
app.use(express.static(__dirname))

app.use(bodyParse.json())

app.use(bodyParse.urlencoded({extended: true}))

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
app.use(router)






module.exports = app.listen(port, ()=>{
  console.log(`server listening on http://localhost:${port}`)
})


