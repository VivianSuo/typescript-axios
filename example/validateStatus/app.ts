import axios from '../../src/index'
import { AxiosError } from '../../src/helpers/error';
axios.get('/validateStatus/304').then(res=>{
  console.log(res)
  console.log('200-300')
}).catch((e:AxiosError)=>{
  console.log(e)
})

axios.get('/validateStatus/304',{
  validateStatus(status){
    return status >= 200 && status < 400
  }
}).then(res=>{
  console.log('200-400')
  console.log(res)
}).catch((e:AxiosError)=>{
  console.log(e)
})