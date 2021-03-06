import { AxiosRequestConfig } from '../types'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
const defaults: AxiosRequestConfig = {
  method:'get',
  timeout:0,
  headers:{
    common: {
      Accept:'application//json,text/plain,*/*'
    }
  },
  transformRequest:[
    function(data:any,headers:any):any{
      processHeaders(headers,data);
      // debugger
      return transformRequest(data)
    }
  ],
  transformResponse:[
    function(data:any):any{
      return transformResponse(data)
    }
  ],
  xsrfCookieName:'XSRF-TOKEN', // 默认的token对应的cookie名
  xsrfHeaderName:'X-XSRF-TOKEN', // 默认的token对应的header名
  validateStatus(status:number):boolean{
    return status >= 200 && status <300
  }
}

const methodsNoData = ['delete','get','head','options'];
methodsNoData.forEach(method=>{
  defaults.headers[method] = {}
})

const methodsWithData = ['post','put','patch'];
methodsWithData.forEach(method=>{
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export default defaults
