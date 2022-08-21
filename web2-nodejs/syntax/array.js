//프로그램의 기초인 CRUD가 중요한 것처럼 배열에서도 CRUB를 배우는 것이 중요하다.
//배열은 대괄호로 시작해서 대괄호로 끝난다. []
var arr = ['A', 'B', 'C', 'D'];// 이 안에 들어오는 데이터는 숫자든 boolean이든 뭐든 상관없다.
console.log(arr[1]);
console.log(arr[3]);
arr[2] = 3;
console.log(arr);
console.log(arr.length);
arr.push('E');
console.log(arr);
