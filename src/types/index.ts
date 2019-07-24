// 自定义类型
export type Method = "get" | "GET" | "post" | "POST" | "delete" | "DELETE" | "put" | "PUT" | "head" | "HEAD" | "options" | "OPTIONS" | "patch" | "PATCH"

// axios请求配置接口
export interface AxiosRequestConfig {
  url?: string;  
  method?: Method; // 请求方式
  data?: any;  // 参数
  params?: any; // 查询字符串参数
  headers?: any; // 请求头
  responseType?:XMLHttpRequestResponseType;  // 响应类型
  timeout?:number;  // 请求超时
  [propName:string]:any;
  transformRequest?: AxiosTransformer | AxiosTransformer[]; // 改变请求的函数
  transformResponse?: AxiosTransformer | AxiosTransformer[]; // 改变响应的函数
  cancelToken?:CancelToken; //  用来取消请求
  withCredentials?:boolean; // 跨域请求是否携带cookie（默认情况下通源策略导致只有不跨域的请求才可以默认携带cookie，跨域的请求无法携带，需要配置xhr）
  xsrfCookieName?:string;  // server端将token添加到cookie中，并用xsrfCookieName指向的字符串来表示
  xsrfHeaderName?:string; //  请求发送的将token追加到请求的headers中，xsrfHeaderName指向的字符串来表示
  onDownloadProgress?:(e: ProgressEvent)=>void;
  onUploadProgress?:(e: ProgressEvent)=>void;
  auth?:AxiosBasicCredentials; // 用户的认证信息，配置该项后会自动在http请求的headers中添加
  validateStatus?:(status:number)=>boolean; // 自定义合法状态
}

export interface AxiosTransformer{
  (data:any,headers?:any):any
}

// axios响应接口
export interface AxiosResponse<T = any>{
  data:T;
  status:number;
  statusText:string;
  headers:any;
  config:AxiosRequestConfig;
  request:any;
}

// axios返回的promise接口
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>>{}

// axios异常接口
export interface AxiosError extends Error{
  config:AxiosRequestConfig;
  code?:number;
  request?:any;
  response?:AxiosResponse;
  isAxiosError:boolean
}

// 创建一个混合对象接口
export interface Axios {
  interceptors: Interceptors
  request<T = any>(config:AxiosRequestConfig):AxiosPromise<T>;
  get<T = any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>;
  delete<T = any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>;
  head<T = any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>;
  options<T = any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>;
  post<T = any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>;
  put<T = any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>;
  patch<T = any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>;
}

// AxiosInstance定义的是一个函数接口 ,支持重载
export interface AxiosInstance extends Axios{
  defaults: any;
  <T = any>(config:AxiosRequestConfig):AxiosPromise<T>
  <T = any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>
}

export interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>
  response: AxiosInterceptorManager<AxiosResponse>
}
// 拦截器管理对象
export interface AxiosInterceptorManager<T>{
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn):number
  forEach(fn:(interceptor:Interceptor<T>)=>void):void
  eject(id:number):void
}
// 对于请求和响应拦截的参数是不同的（请求拦截参数为config,响应拦截参数为response）所以需要用到泛型
export interface ResolvedFn<T=any>{
  (val:T):T | Promise<T>
}
export interface RejectedFn{
  (error:any):any
}

export interface AxiosStatic extends AxiosInstance{
  create(config?:any):AxiosInstance

  CancelToken:CancelTokenStatic
  Cancel:CancelStatic
  isCancel:(value:any)=>boolean
}

//
export interface CancelToken{
  promise: Promise<Cancel>;
  reason?:Cancel
  throwIfRequested():void
}

export interface Canceler{
  (message?:string):void
}

export interface CancelExecutor{
  (cancel:Canceler):void
}

export interface CancelTokenSource{
  token:CancelToken;
  cancel:Canceler;
}

export interface CancelTokenStatic{
  new(executor:CancelExecutor):CancelToken;
  source():CancelTokenSource
}

export interface Cancel{
  message?:string
}

export interface CancelStatic{
  new(message?:string):Cancel
}

export interface URLOrigin{
  protocal:string, // 协议
  host:string      // ip和端口号
}

export interface AxiosBasicCredentials{
  username:string
  password:string
}