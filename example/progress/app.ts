import axios from '../../src/index'
import NProgress from 'nprogress'
const instance = axios.create();

function calculate(loaded:number,total:number):number{
  return Math.floor(loaded*1.0)/total
}

function loadProgressBar(){
  const setStartProgress = function(){
    instance.interceptors.request.use(config=>{
      NProgress.start()
      return config;
    })
  }

  const setUpdateProgress = function(){
    const update = function(e:ProgressEvent){
      NProgress.set(calculate(e.loaded,e.total))
    }
    instance.defaults.onDownloadProgress = update;
    instance.defaults.onUploadProgress = update;
  }

  const setStopProgress = function(){
    instance.interceptors.response.use(response=>{
      NProgress.done();
      return response
    })
  }
  setStartProgress();
  setUpdateProgress();
  setStopProgress();
}
loadProgressBar();
const downloadEl = document.getElementById('download')
downloadEl.onclick = function(){
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
}

const uploadEl = document.getElementById('upload')
uploadEl.onclick = function(){
  const data = new FormData();
  const files = document.getElementById('file') as HTMLInputElement
  if(files.files){
    data.append('file',files.files[0])
    instance.post('/progress/upload',data)
  }
}