import axios from '../../src/axios';

function getA(){
  return axios.get('/all_spread/getA');
}

function getB() {
  return axios.get('/all_spread/getB');
}

axios.all([getA(),getB()]).then(axios.spread(function(resA,resB){
  console.log(resA.data)
  console.log(resB.data)
})).catch((e)=>{
  console.log(e)
})

const fakeConfig = {
  baseURL:'https://www.baidu.com',
  url:'/123/456',
  params:{
    idClient:1,
    idTest:2
  }
}
console.log(axios.getUri(fakeConfig))
axios.all([getA(),getB()]).then(function([resA,resB]){
  console.log(resA)
  console.log(resB)
}).catch(e=>{
  console.log(e)
})