const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get("/products/:id/events/:eventId", function (req, res) {
  const params = req.params;
  const { id, eventId } = params; // destructuring expression; same as const id = params.id
  res.send(`id는 ${id}와 ${eventId}입니다`);
});

app.get("/products", function (req, res) {
  const query = req.query;
  console.log("Query", query);
  res.send({
    products: [
      {
        id: 1,
        name: "습식사료",
        price: 10000,
        seller: "내추럴코어",
        imgUrl: "images/products/food1.jpg",
      },
      {
        id: 2,
        name: "하네스",
        price: 50000,
        seller: "도기멍",
        imgUrl: "images/products/acc1.jpg",
      },
      {
        id: 3,
        name: "배변패드",
        price: 30000,
        seller: "흡수혁명",
        imagUrl: "images/products/house1.jpg",
      },
    ],
  });
});

app.post("/products", function (req, res) {
  const body = req.body;
  res.send({
    /* body:body */
    body,
  });
});

//세팅한 app을 실행한다
app.listen(port, () => {
  console.log("mango-shop server 실행중");
});
