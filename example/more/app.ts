import axios from '../../src/index'

document.cookie = 'a=b'
axios.get("/more/get",{}).then(res=>{
  console.log(res)
}).catch(e=>{
  console.log(e)
})
axios.post("http://localhost:9999/more/server1",{},{withCredentials:true}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})