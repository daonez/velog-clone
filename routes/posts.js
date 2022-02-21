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
      //json객체 반환값으로 현재 업데이트된 문서를 보내기위해서 설정한다. plain은 기타내용제외 수정된정보만 원해서 설정.
      { returning: true, plain: true }
    )

    res.status(200).json(updatedPost)
  } catch (e) {
    console.log(e)
  }
})

//게시물 삭제하기
router.delete("/post/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params
    //findOne 할필욘없음
    const checkPostId = await Post.findOne({ where: { post_id } })

    const deletePost = await checkPostId.destroy({
      where: {
        post_id,
      },
      //paranoid 가 deleteAt을 timestamp으로 만들어주기 때문에, 실제로 데이터베이스에서 삭제할라면 force:true한다.
      force: true,
    })

    if (!deletePost) {
      return res.status(403).send("존재하지 않는 포스트입니다.")
    }

    return res.status(200).json({ result: "success" })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
