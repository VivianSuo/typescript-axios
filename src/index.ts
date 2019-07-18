import { AxiosRequestConfig,AxiosPromise } from './types'
import xhr from './xhr'
import { buildURl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}
// 对config做处理
function processConfig(config: AxiosRequestConfig):void{
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  
}

// 单独用来处理url的方法
function transformUrl(config: AxiosRequestConfig):string{
  const {url,params} = config
  return buildURl(url,params)
  
}
// 处理data转换Object类型的为json字符串
function transformRequestData(config: AxiosRequestConfig):void{
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig):any{
  const {headers = {} , data} = config
  return processHeaders(headers,data)
}
export default axios