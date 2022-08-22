var M = {
    v: 'v',
    f:function(){
        console.log(this.v);
    }
}

//M이 가르키는 위의 객체를 이 모듈 밖에서 사용할 수 있도록 즉, 다른 파일이나 폴더에서 사용할 수 있도록 exports하겠다는 뜻
module.exports = M;
