import axios from '../../src/index'
import { AxiosError } from '../../src/helpers/error';
import qs from 'qs'
axios.get('/paramSerializer/get',{
  params:new URLSearchParams('a=1&b=2')
}).then(res=>{
  console.log(res)
}).catch((e:AxiosError)=>{
  console.log(e)
})

axios.get('/paramSerializer/get', {
  params: {
    aa:1,
    bb:2,
    cc:[11,22]
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e)
})

let instance = axios.create({
  paramsSerializer(params){
    return qs.stringify(params,{arrayFormat: 'brackets'})
  }
})
instance.get('/paramSerializer/get', {
  params: {
    aa: 1,
    bb: 2,
    cc: [11, 22]
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e)
})