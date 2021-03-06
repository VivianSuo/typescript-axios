import axios from '../../src/index'
axios({
  method:'post',
  url:'/extend/post',
  data:{
    msg:'hi'
  }
})

axios.request({
  method:'post',
  url:'/extend/post',
  data:{
    msg: 'world'
  }
})

axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.post('/extend/post',{msg:'post'})
axios.put('/extend/put',{msg:'put'})
axios.patch('/extend/patch',{msg:'patch'})

axios('/extend/post',{
  method:'post',
  data:{
    b:333
  }
})

interface ResponseData<T = any>{
  code:number
  result:T
  message:string
}

interface User{
  name:string
  age:number
}

function getUser<T>(){
  return axios<ResponseData<T>>('/extend/user')
  .then(res=>res.data)
  .catch(err=>console.error(err))
}

async function test(){
  const user = await getUser<User>()
  console.log(user)
  if(user){
    console.log(user.result.name)
  }
}

test()