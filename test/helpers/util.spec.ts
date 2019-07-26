import {
  isDate,
  isPlainObject,
  isFormData,
  isURLSameOrigin,
  extend,
  deepMerge
} from '../../src/helpers/util'

describe('helpers:util', ()=>{
  describe('isXX', ()=>{
    test('should validate Date',()=>{
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })
    test('should validate PlainObject',()=>{
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })
    
    test('should validate FormData',()=>{
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })
    test('should validate isURLSameOrigin',()=>{
      expect(isURLSameOrigin('127.0.0.1:8083')).toBeTruthy()
      expect(isURLSameOrigin('http://localhost:8080')).toBeFalsy()
    })
  })
  describe('extend',()=>{
    test('should be mutable',()=>{
      const a = Object.create(null);
      const b = { foo : 123};
      extend(a,b);
      expect(a.foo).toBe(123)
    })
    test('should be properties',()=>{
      const a = { foo:123,bar:456};
      const b = { bar:332};
      const c = extend(a,b);
      expect(c.bar).toBe(332)
    })
  })
  describe('deepMerge',()=>{
    test('should be properties',()=>{
      const a = { foo: 123};
      const b = { bar: 456};
      const c = { go : true};
      const d = {
        e:{
          f:1
        }
      }
      const g = deepMerge(a,b,c,d);
      expect(g.e.f).toBe(1)
    })
    test('should deep recursively',()=>{
      const a = {
        foo: 'foo',
        bar: {
          b:'b'
        }
      }
      const b = {
        foo1: '123',
        bar1: 'dd'
      }
      const c = deepMerge(a,b);
      expect(c).toEqual(
        {
          foo:'foo',
          bar:{b:'b'},
          foo1: '123',
          bar1: 'dd'
        }
      )
    })
    test('should remove all references from nested objects',()=>{
      const a = { foo: { bar:123}};
      const b = { bar:1};
      const c = deepMerge(a,b);
      expect(c.foo).not.toBe(a.foo) // 此处测试表面对象是深度拷贝，对象的指向的地址发生来变化
      expect(c.foo).toEqual(a.foo)
    })
  })
  describe('isURLSameOrigin', () => {
    test('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })

    test('should detect different origin', () => {
      expect(isURLSameOrigin('https://github.com/axios/axios')).toBeFalsy()
    })
  })
})