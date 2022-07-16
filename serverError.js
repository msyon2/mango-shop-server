const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      ㅂ;
      cb(null, file.originalname);
    },
  }),
});
const port = 8080;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/products/:id", function (req, res) {
  const params = req.params;
  const { id } = params; // destructuring expression; same as const id = params.id
  //individual product search : findOne
  models.Product.findOne({
    where: {
      id, //id:id,
    },
  })
    .then((result) => {
      res.send({ product: result });
    })
    .catch((err) => {
      console.error(err);
      res.send("상품조회시 에러가 발생했습니다");
    });
});

app.get("/products", function (req, res) {
  models.Product.findAll({
    /* limit: 1, */ //limit of no. of products to be searched
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "price", "seller", "imgUrl", "createdAt"],
  })
    .then((result) => {
      res.send({
        product: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.send("error 발생");
    });
});

app.post("/products", function (req, res) {
  const body = req.body;
  //1. 디스트럭처링으로 상수 body 의 값을 개별적으로 assign
  const { name, description, price, seller } = body;
  if (!name || !description || !price || !seller) {
    res.send("모든 필드를 입력해주세요");
  }
  //2. creating record: Product table
  models.Product.create({
    name,
    description,
    price,
    seller,
  })
    .then((result) => {
      console.log("상품생성결과:", result);
    })
    .catch((err) => {
      console.error(err);
      res.send("상품업로드에 문제가 발생했습니다");
    });
  //res.send({
  /* body:body */
  //body,
  //});
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imgUrl: file.path,
  });
});
//세팅한 app을 실행한다
app.listen(port, () => {
  console.log("mango-shop server 실행중");
  //database sync function
  models.sequelize
    //.sync()안에 작성한 내용를 DB와 sync
    .sync()
    .then(() => {
      console.log("DB 연결 성공");
    })
    .catch((err) => {
      console.log("DB 연결 실패");
      console.error(err);
      //error발생시 terminate sever process
      process.exit();
    });
});
