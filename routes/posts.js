const express = require("express")
const router = express.Router()
const { Post } = require("../models/")

//게시물 작성하기
router.post("/post", async (req, res) => {
  const { title, content, img_url } = req.body
  const { user_id } = res.locals

  try {
    const post = await Post.create({
      //postId 는 자동으로 생성됨..
      // post_id: 1,
      title,
      content,
      img_url,
      //userId는 로그인사용자꺼 가져와야함, 임시로 1로 지정..
      fk_user_id: 1,
    })
    res.status(201).json(post)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

//게시물 수정하기

router.patch("/post/:post_id", async (req, res) => {
  const { post_id } = req.params
  const { title, content, img_url } = req.body
  try {
    const checkPostId = await Post.findOne({ where: { post_id } })

    const updatedPost = await checkPostId.update(
      {
        title,
        content,
        img_url,
      },
      { returning: true, plain: true }
    )

    res.status(200).json(updatedPost)
  } catch (e) {
    console.log(e)
  }
})

//게시물 삭제하기

module.exports = router
