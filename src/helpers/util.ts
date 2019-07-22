const toString = Object.prototype.toString;
// Object.prototype.toString.call(val) === '[object type]'来判定val的类型主要是object的各种类型
// val is Date类型保护，可以在使用isDate方法时指定为true的分支中是Date类型false分支中不是Date类型，即在为true的分支中可以用Date类型对象的属性和方法来。
export function isDate (val:any):val is Date{
  return toString.call(val) === '[object Date]'
}
// typeof 可以判定基本数据类型和几个主要的引用类型
// export function isObject(val:any):val is Object{
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val:any):val is Object{
  return toString.call(val) === '[object Object]'
}

// 封装一个辅助函数，用到了交叉类型，目标是把from中的属性扩展到to中（包括原型上的属性）
export function extend<T,U>(to:T,from:U):T & U{
  for(const key in from){
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs:any[]):any{
  const result = Object.create(null);
  objs.forEach(obj=>{
    if(obj){
      Object.keys(obj).forEach(key=>{
        const val = obj[key];
        if(isPlainObject(val)){
          if(isPlainObject(result[key])){
            result[key] = deepMerge(result[key],val)
          }else{
            result[key] = deepMerge({},val)
          }
        }else{
          result[key] = val
        }
      })
    }
  })
  return result
}