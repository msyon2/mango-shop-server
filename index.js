var http = require("http");
var hostname = "127.0.0.1";
var port = "8080"; //server port

//createServer (request 요청, resepond 응답)
const server = http.createServer((req, res) => {
  const path = req.url;
  const method = req.method;

  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      const products = JSON.stringify([
        {
          name: "배변패드",
          price: "50000",
        },
      ]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성되었습니다");
    }
  }
  res.end("thanks for your patronage");
  //console.log("request:", req);
  //res.end("Welcome Client"); //end is an end point
});

//서버를 요청 대기 상태로 만든다
server.listen(port, hostname);
console.log("mango shop sever on");
