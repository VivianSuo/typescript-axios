import { isPlainObject } from './util'
// 请求时转换data对象为json字符串
export function transformRequest(data:any):any{
  if(isPlainObject(data)){
    // debugger
    data = JSON.stringify(data)
  }
  return data
}

// 接收响应时转换字符串为对象
export function transformResponse(data:any):any{
  if(typeof data === 'string'){
    try{
      data = JSON.parse(data)
    }catch(e){
      console.log(e)
    }
  }
  return data
}