/*function a(){
    console.log('A');
}*/
//위의 함수와 기능을 똑같지만 이름이 없는 함수 즉, 익명 함수이다.
/*function(){
    console.log('A');
}*/
//그렇기 때문에 익명함수를 호출시켜주려면 아래처럼 이름을 부여해준다
var a = function(){
    console.log('A');
}

function slowfunc(callback){
    callback();
}

slowfunc(a);