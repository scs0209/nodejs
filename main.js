var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log(queryData.id);
    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return; //위에 3줄은 최근에 사용하는 걸로 동영상과는 약간 코드가 다르다
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.end(template);
    })

});
app.listen(4000);

//url은 모듈: node.js가 가지고 있는 수많은 기능들을 비슷한 것끼리 그룹핑된 것을 모듈이라 한다. 즉 우리는 url이라는 모듈을 사용할 것이다라는 것들 node.js에게 알려준 것
//그리고 앞으로 url이라는 모듈은 url이라는 변수를 통해서 사용할 것이다라는 뜻
//아래에 url들이 변수의 url과 겹치기 때문에 _를 사용하여 준다.
//
