var p = {
    v1:'v1',
    v2:'v2',
    f1:function (){
    console.log(this.v1);
    },
    f2:function (){
    console.log(this.v2);
    }
}


p.f1();
p.f2();

//여기서 사용하는 원리는 function은 값이다 object는 값을 저장하는 그릇이다라는 특성을 이용해서 서로 연관된 데이터와 또한 서로 연관된 처리방법들을 담고있는 함수들을 위에 처럼 그룹핑함을 통해서 우리는 코드의 복잡성을 획기적으로 낮출 수 있다는 것을 알 수 있다.