//round라는 함수가 있는데 함수가 몇백개 있으면 관리하기 힘든데 그것을 관리하기 위한 디렉토리가 객체이다 (여기서는 Math)
//round는 반올림 함수
console.log(Math.round(1.6));//2
console.log(Math.round(1.4));//1
//console.log를 이용하여 우리가 만들어서 사용하는 함수랑 Math.round라는 자바스크립트의 기본적인 내장 함수는 조금 다르다

//()안에 있는 것은 매개변수이다
function sum(first, second){//parameter 매개변수: argument를 받아서 함수안으로 전달해주는
  return first+second;
}

console.log(sum(2, 4));

sum(2,4); //argument ()안에 있는 입력 값 하나하나

Math.round(1.6);//이 상태로는 출력 x 앞에 console.log를 사용해야함
