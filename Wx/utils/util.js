function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function converTOArr(arr){
  var num=arr.toString().substring(0,1);
  var array=[];
  for(var i=0;i<5;i++){
    if(i<num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
  return array;
}

function http(url,callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}


module.exports = {
  formatTime: formatTime,
  converTOArr: converTOArr,
  http: http
}
