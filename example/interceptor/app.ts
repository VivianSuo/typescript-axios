import axios from '../../src/index'

axios.interceptors.request.use(config=>{
  config.headers.test +=1;
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += 2;
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += 3;
  return config
})

axios.interceptors.response.use(res=>{
  res.data +=1
  return res
})
let interceptor = axios.interceptors.response.use(res => {
                      res.data += 2
                      return res
                    })
axios.interceptors.response.use(res => {
  res.data += 3
  return res
})

axios.interceptors.response.eject(interceptor)

// then 调用的时候可以一次性拿到请求拦截和请求和响应拦截的方法调用
axios({
  url:'/interceptor/get',
  method:"get",
  headers:{
    test:''
  },
}).then(res=>{
  console.log(res.data)
})