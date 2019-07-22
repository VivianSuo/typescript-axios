import { ResolvedFn, RejectedFn, Interceptor} from '../types'


export default class InterceptorManager<T>{
  // 私有属性interceptors用来存储use的拦截器
 private interceptors: Array<Interceptor<T> | null>
 constructor(){
   this.interceptors = []
 }

 // use方法的作用是添加新的拦截器到interceptors中
 use(resolved:ResolvedFn,rejected?:RejectedFn):number{
  this.interceptors.push({
    resolved,
    rejected
  })
  return this.interceptors.length - 1
 }

 forEach(fn:(interceptor:Interceptor<T>)=>void):void{
   this.interceptors.forEach(interceptor=>{
     if(interceptor!==null){
       fn(interceptor)
     }
   })
 }

 // eject用于删除对应id的拦截器
 eject(id:number):void{
   if(this.interceptors[id]){
     this.interceptors[id] = null
   }
 }
}