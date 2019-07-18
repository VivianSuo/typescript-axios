import { AxiosInstance } from './types'
import Axios from './core/Axios'
import {extend} from './helpers/util'
import { create } from 'domain';

function createInstance():AxiosInstance{
  const context = new Axios();
  // instance是一个方法，this指向了context
  const instance = Axios.prototype.request.bind(context);
  // 把context实例上的方法和属性复制到instance函数上
  extend(instance,context);
  // 此处ts无法断定instance的类型，用断言来将其断言成AxiosInstance类型
  return instance as AxiosInstance
}
// axios 是一个混合对象，本身是一个函数，又拥有Axios类的所有原型和实例属性
const axios = createInstance();
export default axios
