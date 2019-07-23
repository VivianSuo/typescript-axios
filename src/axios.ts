import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import {extend} from './helpers/util'
import { create } from 'domain';
import defaults from './core/default'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'
function createInstance(config:AxiosRequestConfig):AxiosStatic{
  const context = new Axios(config);
  // debugger;
  // instance是一个方法，this指向了context
  const instance = Axios.prototype.request.bind(context);
  // 把context实例上的方法和属性复制到instance函数上
  extend(instance,context);
  // 此处ts无法断定instance的类型，用断言来将其断言成AxiosStatic类型
  return instance as AxiosStatic
}

// axios 是一个混合对象，本身是一个函数，又拥有Axios类的所有原型和实例属性
const axios = createInstance(defaults);
axios.create = function create(config:any){
  // return createInstance(mergeConfig(defaults,config))
  return createInstance(config)
}
axios.CancelToken = CancelToken;
axios.Cancel = Cancel;
axios.isCancel = isCancel;

export default axios
