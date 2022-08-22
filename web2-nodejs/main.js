var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){
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
    ${control}
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

    //home
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
            var template = templateHTML(title, list, 
              `<h2>${title}</h2>${description}`, 
              `<a href="/create">create</a>`
              );
            response.writeHead(200);
            response.end(template);
          });
      } else {
        fs.readdir('./data', function(err, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, 
              `<h2>${title}</h2>${description}`, 
              `<a href="/create">create</a>
              <a href="/update?id=${title}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
              </form> `//id를 선택한 값이라 모두를 넣어 줌, a href="/update?id=${title}"이 코드는 url수정 링크 update를 눌르면 query string에 ?id=CSS 이렇게 더해져서 나온다.
              );
            response.writeHead(200);
            response.end(template);
          });
        });
      }
      //`<a href="/create">create</a> <a href="/update">update</a>` 아래는 create페이지인데 또 create가 나올 필요가 없으므로 하지 않는다.
      //create버튼
    } else if(pathname === '/create'){
      fs.readdir('./data', function(err, filelist){
            var title = 'Web - create';
            var list = templateList(filelist); //매개변수 filelist는 data폴더에 있는 file의 list를 가르킨다
            var template = templateHTML(title, list, `
            <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            `, '');
            response.writeHead(200);
            response.end(template);
          });
          //create 파일의 생성과 관련
    } else if (pathname === '/create_process') {
      var body = '';
      //웹 브라우저가 호스트 방식으로 데이터를 전송할 때 데이터가 엄청나게 많으면 그 데이터를 한번에 처리하다가는 프로그램이 꺼진다거나 무리가 가는데 그래서 node.js에서는 post방식으로 전송되는 데이터가 많을 경우에 대비해서 아래의 코드를 제공하고 있는데 data 원소는 특정한 양(100이 있으면 그 중에서 조각조각을 서버에서 수신할 때 마다 서버는 이 콜백 함수를 호출하도록 약속하고 있다. 그리고 그걸  호출할 때 데이터라는 인자를 통해서 수신한 정보를 주기로 약속하고 있다.)
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            //200은 성공했다는 뜻이고
            //302는 다른 곳에서 redirect를 하라는 뜻이다.
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
      });
//update 버튼
    } else if(pathname === '/update') {
      fs.readdir('./data', function(err, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, 
              `
              <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p>
                  <textarea name="description" placeholder="description">${description}</textarea>
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>
              `, 
              `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
              );
            response.writeHead(200);
            response.end(template);
          });
        });
        //update의 수정과 관련
    } else if (pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        //data/${id}가 data/${title}로 submit을 하면 data폴더에 있는 파일의 이름이 바뀐다
        // 파일의 이름과 description을 수정하면 바뀐다!
        fs.rename(`data/${id}`, `data/${title}`, function(err){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
          })
        });
      });
      //현재 페이지 삭제
    } else if (pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`, function(err){
          response.writeHead(302, {Location: `/`});
          response.end();  
        })
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(4000);

//url은 모듈: node.js가 가지고 있는 수많은 기능들을 비슷한 것끼리 그룹핑된 것을 모듈이라 한다. 즉 우리는 url이라는 모듈을 사용할 것이다라는 것들 node.js에게 알려준 것
//그리고 앞으로 url이라는 모듈은 url이라는 변수를 통해서 사용할 것이다라는 뜻
//아래에 url들이 변수의 url과 겹치기 때문에 _를 사용하여 준다.
