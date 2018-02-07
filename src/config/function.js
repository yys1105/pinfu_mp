import wepy from 'wepy';
import * as http from './http'

/*
* 验证器
* [{
*   value:this.this.phone,
*   type:'phone',
*   regStr:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
*   rquired:true
* }]
* */
export function verify(arr) {
  return new Promise(function(resolve, reject) {
    var rgx = new RegExp()
    for(let item of arr){
      if(item.required&&!item.value){
        reject({res:false, msg:item.required})
        break;
      }else{
        if(item.regStr||item.type){
          rgx = item.regStr?item.regStr:regType(item.type)
          if(!rgx.test(item.value)){
            reject({res:false, msg:item.err?item.err:'格式错误'})
            break;
          }
        }
      }
    }
    resolve({
      res:true,
      msg:''
    });
  })

}
function regType(type) {
  switch(type)
  {
    case 'phone':
      return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      break;
    case 'email':
      return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      break;
  }
}

/*
* 获取用户信息
* */
export function getUserInfo() {
  return new Promise(function(resolve, reject) {
    wx.getStorage({
      key: 'user-info',
      success: (res) => {
        console.log(res.data.access_token)
        http.httpGet('user/info',{
          expand:'location_address',
          'access-token':res.data.access_token
        }).then((data)=>{
          resolve(data)
        },err=>{
          reject(err)
        })
      }
    })
  })
}
