var number = [1,400,12,34,5,6];//배열 안에 있는 각각의 값들은 element(원소)라고 한다.
var i = 0;
var total = 0;
while(i < number.length){
  console.log(number[i]);
  total = total + number[i];
  i = i + 1;
}
console.log(`total : ${total}`);
