import axios from '../../src/axios'
import qs from 'qs'
import { AxiosTransformer, Axios } from '../../src/types';
// tslint:disable-next-line: no-floating-promises
// axios({
//   transformRequest:[(function(data){
//     // return qs.stringify(data)
//     return data
//   }),...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse:[...(axios.defaults.transformResponse as AxiosTransformer[]),function(data){
//     console.log(data)
//     if(typeof data === 'object'){
//       console.log('data is object')
//       data.b = 2
//     }
//     return data
//   }],
//   url:'/config/post',
//   method:'post',
//   data:{
//     a:1
//   },
//   headers:{
//     test:124
//   }
// }).then((res)=>{
//   console.log(res.data)
// })

const instance = axios.create({
  transformRequest: [function (data) {
    // debugger;
    // return JSON.stringify(JSON.parse(data))
    return data
  },...(axios.defaults.transformRequest as AxiosTransformer[])],
    transformResponse:[...(axios.defaults.transformResponse as AxiosTransformer[]),function(data){
    // console.log(data)
    if(typeof data === 'object'){
      // console.log('data is object')
      data.b = 2
    }
    return data
  }]
})
instance('/config/post',
{
  url:'',
  method:'post',
  data:{
    a:1
  },
  headers:{
    test:124
  }
}).then(res=>{
  console.log(res.data)
}).catch(err=>{
  console.log(err)
})