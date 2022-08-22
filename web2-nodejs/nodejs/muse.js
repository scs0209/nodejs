// var M = {
//     v: 'v',
//     f:function(){
//         console.log(this.v);
//     }
// }

//require는 모듈을 가져올 때 사용
var part = require('./mpart.js');
//M.f();//v 모듈을 사용하지 않은 코드

part.f();//v
//모듈을 사용함
