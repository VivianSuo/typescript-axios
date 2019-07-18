import axios from "../../src/index"

axios({
  method:"get",
  url: '/simple/get?bb=1#hash',
  params: {
    a:[1,2],
    b:2,
    c:{d:1},
    e:new Date()
  }
})