import { AxiosRequestConfig, AxiosPromise, AxiosResponse, Method, ResolvedFn, RejectedFn, Interceptors} from '../types'
import dispatchRequest from './dispatchRequest'
import mergeConfig from './mergeConfig'
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export class InterceptorManager<T>{
  // 私有属性interceptors用来存储use的拦截器
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }

  // use方法的作用是添加新的拦截器到interceptors中
  use(resolved: ResolvedFn, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  // eject用于删除对应id的拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}



interface PromiseChain{
  resolved: ResolvedFn | ((config:AxiosRequestConfig)=>AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  interceptors:Interceptors
  defaults: AxiosRequestConfig
  constructor(initConfig: AxiosRequestConfig){
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url:any,config?:any):AxiosPromise{
    // debugger
    
    if(typeof url === 'string'){
      if(!config){
        config = {}
      }
      config.url = url
    }else{
      config = url
    }
    config = mergeConfig(this.defaults, config)
    // chain数组的作用是用来存储请求拦截、请求、响应拦截的成功和失败函数组成的对象，默认只有请求成功的方法
    const chain:PromiseChain[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    // 向chain数组中添加请求拦截器，先添加的后执行，后添加的先执行
    this.interceptors.request.forEach(interceptor=>{
      chain.unshift(interceptor)
    })

    // 向chain数组中添加响应拦截器，先添加的先执行。
    this.interceptors.response.forEach(interceptor=>{
      chain.push(interceptor)
    })

    // 创建一个已决的promise，后面调用then方法时会被resolved接收传递的参数。
    let promise = Promise.resolve(config)

    // 循环便利chain数组，依次链式调用promise
    while(chain.length){
      const {resolved,rejected} = chain.shift()!
      promise = promise.then(resolved,rejected)
    }
    return promise
  }
  get(url:string,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithoutData('get',url,config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  post(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMethodWithData('post',url,data,config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  _requestMethodWithoutData(method:Method,url:string,config?:AxiosRequestConfig):AxiosPromise{
    return this.request(Object.assign(config || {},{ method, url}))
  }

  _requestMethodWithData(method: Method, url: string, data?:any, config?: AxiosRequestConfig):AxiosPromise{
    return this.request(Object.assign(config||{},{method,url,data}))
  }
}