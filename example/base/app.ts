import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: { 'content-type':'application/json;charset=utf-8'},
  headers: {
    'content-type':'application/json;charset=utf-8'
  },
  data: {
    a:1,
    b:2
  }
}).then((res)=>{
  console.log(res)
})

let arr = new Int32Array([21,44])
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

const paramString = 'a=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})