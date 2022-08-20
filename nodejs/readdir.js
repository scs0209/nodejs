var testFolder = './data'; // ./이거는 현재 디렉토리라는 뜻이다 즉 ./data는 현재 디렉토리에 있는 데이터라는 뜻이다.
var fs = require('fs');

//err, filelist는 변수 이름 중요한건 자릿수와 위치
fs.readdir(testFolder, function(err, filelist){
  console.log(filelist);
})
