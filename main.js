var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}
function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      //어떤 없는 값을 호출하려고 했는 때 자바스크립트는 undefined라고 정의한다.
      if(queryData.id === undefined){
        //fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
          //밑에 title과 description을 변수에다가 직접 알려주고 있기 때문에 위에 구문
          //특정 디렉토리에서 파일을 읽어서 description이라는 변수 값을 우리에게 생성해주는 위의 코드는 필요없다.
          fs.readdir('./data', function(err, filelist){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = templateList(filelist); //매개변수 filelist는 data폴더에 있는 file의 list를 가르킨다
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          })
      } else {
        fs.readdir('./data', function(err, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    } else {
      response.writeHead(404);
      response.end('Not found');
    }



});
app.listen(4000);

//url은 모듈: node.js가 가지고 있는 수많은 기능들을 비슷한 것끼리 그룹핑된 것을 모듈이라 한다. 즉 우리는 url이라는 모듈을 사용할 것이다라는 것들 node.js에게 알려준 것
//그리고 앞으로 url이라는 모듈은 url이라는 변수를 통해서 사용할 것이다라는 뜻
//아래에 url들이 변수의 url과 겹치기 때문에 _를 사용하여 준다.
//
