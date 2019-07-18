import axios,{AxiosError} from '../../src/index'

axios({
  method:'get',
  url:'/error/get',
}).then(res=>{
  console.log(res)
}).catch((err: AxiosError)=>{
  console.log(err.message)
  console.log(err.config)
})

axios({
  method: 'get',
  url: '/error/get1',
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err.config)
})

setTimeout(()=>{
  axios({
    method: 'get',
    url: '/error/get',
  }).then(res => {
    console.log(res)
  }).catch((err: AxiosError) => {
    console.log(err.config)
  })
},3000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout:2000
}).then(res => {
  console.log(res)
}).catch((err:AxiosError) => {
  console.log(err.message)
  console.log(err.config)
})