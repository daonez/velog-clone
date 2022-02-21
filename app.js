require("dotenv").config()
const express = require("express")
const app = express()
const postRouter = require("./routes/posts")
//const userRouter = require("./routes/users")

//body 읽기
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
app.use("/", [postRouter])

app.get("/", (req, res) => {
  res.send("hello world")
})

app.listen(3000, () => {
  console.log("서버 실행~~")
})
