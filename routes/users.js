const express = require("express")
const { User } = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router()

// 회원가입 POST API /api/user/new
router.post("/new", async (req, res) => {
  try {
    const { user_id, email, nickname, password } = req.body
    // password 암호화
    const encryptedPassword = bcrypt.hashSync(password, 10)

    await User.create({
      user_id: user_id,
      email: email,
      password: encryptedPassword,
      nickname: nickname,
    })
    res.status(200).json({
      msg: "회원가입 성공",
    })
  } catch (error) {
    res.status(400).json({
      errorMessage: "입력정보를 다시 확인해주세요.",
    })
  }
})

// 로그인 POST API /api/user/login
router.post("/login", async (req, res) => {
  try {
    const { user_id, password } = req.body
    const user = await User.findAll({
      where: {
        user_id: user_id,
      },
    })
    // 유저 정보가 없으면 예외처리
    if (!user.length) {
      throw error
    }
    // jwt 토큰 발급 여기부분 중요..
    const token = jwt.sign({ userID: user[0].dataValues.userID }, "my-secret-key")
    res.send({
      token,
      msg: "로그인 완료!",
    })
  } catch (error) {
    res.status(400).json({
      errorMessage: "회원정보를 다시 확인해주세요.",
    })
  }
})

// 사용자 인증(로그인 상태를 확인해주는 기능)
router.get("/me", (req, res) => {
  const { user } = res.locals
  res.send({
    user,
  })
})

module.exports = router
