import { AxiosRequestConfig } from '../types'
import { isPlainObject,deepMerge } from '../helpers/util'
interface Strats{
  [propName:string]:(val1:any,val2:any)=>{}
}
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: any
): AxiosRequestConfig{
  // debugger
  let strats: Strats = {}
  if(!config2){
    config2 = {};
  }
  const config = Object.create(null);
  for(let key in config2){
    mergeField(key)
  }
  for(let key in config1){
    if(!config2[key]){
      mergeField(key)
    }
  }
  
  function mergeField(key:string):void{
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key],config2![key])
  }
  function defaultStrat(val1: any, val2: any): any {
    if (typeof val2 !== 'undefined') {
      return val2
    }else{
      return val1
    }
  }
  function fromVal2Strat(val1:any,val2:any):any{
    if(typeof val2 !== 'undefined'){
      return val2
    }
  }
  const stratKeysFromVal2 = ['url', 'params', 'data']
  stratKeysFromVal2.forEach(key=>{
    strats[key] = fromVal2Strat
  })
  function deepMergeStrat(val1: any, val2: any): any {
    if(isPlainObject(val2)){
      return deepMerge(val1,val2)
    }else if(typeof val2 !== 'undefined'){
      return val2
    }else if(isPlainObject(val1)){
      return deepMerge(val1)
    }else if(typeof val1 !== 'undefined'){
      return val1
    }
  }
  const stratKeysDeepMerge = ['headers']
  stratKeysDeepMerge.forEach(key=>{
    strats[key] = deepMergeStrat
  })
  return config
}
