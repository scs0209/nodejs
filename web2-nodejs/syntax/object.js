//배열은 리터럴이(표현하는 방법) [], 객체는 {} 중괄호이다.
var members = ['chang', 'dong', 'tan']
console.log(members[1]);//dong
var i = 0;
while(i < members.length){
    console.log('array loop', members[i]);
    i = i + 1;
}



var roles = {
    'programmer': 'chang',
    'desginer': 'dong',
    'manager': 'tan'
}
console.log(roles.desginer);//dong
console.log(roles['desginer']);

for(var name in roles){
    console.log('object =>', name, 'value =>', roles[name]);
}