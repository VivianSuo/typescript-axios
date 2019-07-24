import axios from '../../src/index'

const username = 'hahalia';
const password = '323423d';
axios.post('/authorization/post',{a:1},{
  auth:{
    username,
    password
  }
}).then(res=>{
  console.log(res)
}).catch(e=>{
  console.log(e)
})

axios.post('/authorization/post', { a: 1 }, {
  auth: {
    username:'yes',
    password:"121"
  }
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})