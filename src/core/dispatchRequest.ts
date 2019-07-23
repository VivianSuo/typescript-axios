import { AxiosRequestConfig, AxiosPromise } from '../types'
import xhr from './xhr'
import { buildURl } from '../helpers/url'
import { transformRequest } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'
import transform from './transform'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config)
}
// 对config做处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  // debugger
  config.data = transformRequestData(config)
  // config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers,config.method!)
}

// 单独用来处理url的方法
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURl(url!, params)

}
// 处理data转换Object类型的为json字符串
function transformRequestData(config: AxiosRequestConfig): void {
  return transformRequest(config.data)
}

// 处理headers
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function throwIfCancellationRequested(config:AxiosRequestConfig):void{
  if(config.cancelToken){
    config.cancelToken.throwIfRequested()
  }
}