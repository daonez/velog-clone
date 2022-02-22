require("dotenv").config()
const express = require("express")
const app = express()
const postRouter = require("./routes/posts")
const userRouter = require("./routes/users")
const commentRouters = require("./routes/comment")
const cors = require("cors")

//미들웨어
//body 읽기
app.use(express.json())
//true면 json객체안에 객체를 더 넣을수있음
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// sql 연결
const { sequelize } = require("./models")
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공")
  })
  .catch((err) => {
    console.error(err)
  })

//router 미들웨어
app.use("/", [postRouter, userRouter, commentRouters])

app.get("/", (req, res) => {
  res.send("hello world")
})

app.listen(3000, () => {
  console.log("서버 실행~~")
})
