var fs = require('fs');
/*
//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/


console.log('A');
//아래의 뜻은 syntax/sample.txt에서 파일을 가져오는데 시간이 걸리기 때문에
//세번째 문장을 먼저 실행시킨후 완료가 되면 그때 출력을 하라는 뜻
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);//모든 작업이 끝난 후에 작업을 실행시키기 위한 구문(즉 이부분이 callback이다.)
});
console.log('C');