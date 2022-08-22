//데이터를 사용하기 좋게 잘 정리정돈 해주는 도구(array, object)
//함수function을 데이터로 취급하여 배열과 객체에 담을 수 있다!!
//값으로서 함수를 배열에 담는 경우는 별로 없다 대신에 객체에 많이 담는다.

var f = function (){
    console.log(1+1);
    console.log(1+1);
}
var a = [f];
a[0](); //배열의 원소로서 함수가 존재할 수 있음

//객체에 함수를 담음
var o = {
    func:f
}
o.func();



//var i = if(true){console.log(1)};//오류가 나온다. 자바스크립트에서는 저 조건문이라는 구문이 답이 아니기 때문이다.
//var w = while(true){console.log(1)};//이것 또한 위의 식과 똑같은 결과가 나온다.