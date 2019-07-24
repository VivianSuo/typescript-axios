import { CancelExecutor, Canceler, CancelTokenSource, Cancel} from '../types'
import CancelObj from './Cancel'
interface ResolvePromise{
  (reason?: Cancel):void
}

// 创建cancelToken类
export default class CancelToken{
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(executor:CancelExecutor){
    let resolvePromise:ResolvePromise
    // resolvePromise用来指向resolve函数，可以用于将其引出到promise构造函数之外调用。传递的内容是一个reason对象，他具有message属性。
    this.promise = new Promise<Cancel>(resolve=>{
      resolvePromise = resolve
    })
    // 执行器函数，作用是用来判定是否
    executor(message=>{
      if(this.reason){
        // debugger
        return 
      }
      this.reason = new CancelObj(message)
      resolvePromise(this.reason)
    })

  }
  throwIfRequested():void{
    if(this.reason){
      throw this.reason
    }
  }
  static source(): CancelTokenSource{
    let cancel!:Canceler;
    const token = new CancelToken((c)=>{
      cancel = c
    });
    return {
      cancel,
      token
    }
  }
}
