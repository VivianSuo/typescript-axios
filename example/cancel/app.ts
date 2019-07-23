import axios,{ Canceler } from "../../src/index"
const CancelToken = axios.CancelToken;
const source = CancelToken.source(); // 实例化CancelToken
console.log(source.token.promise)// 实例化后就拥有一个pending状态的promise

// 重点是每个请求中的CancelToken实例应该都是唯一的。
// 实际应用场景
// 1、路由跳转即切换页面时取消上一个页面已发送未返回的请求。1）定义一个全局的数组来维护所有的cancelToken的cancel;2)在页面路由钩子中调用全局数组的所有的cancel方法，然后删除当前cancel;
// 2、多次点击的时候取消掉重复的请求。1）全局定义一个数组用来存储不可以重复的请求；2）在请求拦截中判定数组中有没有当前请求，有的话取消；3）在响应拦截中删掉数组中存储的当前请求。

axios.get("/cancel/get",{
  cancelToken:source.token
}).catch(function(e){
  if(axios.isCancel(e)){
    console.log('Request canceled', e.message)
  }
})

setTimeout(function(){
  source.cancel('Operation canceled by the user') // 此处是调用executor执行器，来将状态pending通过resolve转换成fulfilled传给then的函数参数，在axios再次调用的时候，会触发。
  axios.post("/cancel/post", { m: 2 },{
    // 此处传递同一个token，会触发then中的request.abort()方法来停止当前请求操作。
    cancelToken:source.token
  }).catch(function(e){
    if(axios.isCancel(e)){
      console.log(e)
      console.log(e.message)
    }
  })
  setTimeout(function(){
    axios.post("/cancel/post", { m: 3 }, {
      // cancelToken: source.token
    }).catch(function (e) {
      if (axios.isCancel(e)) {
        console.log(e)
        console.log(e.message)
      }
    })
  },1000)
},1000)

let cancel:Canceler
axios.get("/cancel/get",{
  cancelToken:new CancelToken(c=>{
    cancel = c
  })
}).catch(e=>{
  if(axios.isCancel(e)){
    console.log(e.message)
    console.log('request canceled')
  }
})

setTimeout(function(){
  cancel('haha game over')
},200)