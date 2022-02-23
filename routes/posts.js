const express = require("express")
const router = express.Router()
const { Post, User, Comment, sequelize } = require("../models/")
const { upload } = require("../middlewares/uploads")
const authMiddleWare = require("../middlewares/auth")

//메인페이지에 게시물 전체 가져오기
// -추후 댓글/유저 닉네임? 가져오기 추가해야함.

router.get("/post", async (req, res) => {
  try {
    // 게시글 작성자 찾아오기
    const user = await User.findAll({
      raw: true,
    })
    // 게시글 DB에서 불러오기
    const posts = await Post.findAll({
      raw: true,
      include: [{ model: Comment, attributes: ["comment_id"] }],
    })
    //제일 최신날짜의 게시물이 앞으로 옴.
    posts.sort((a, b) => b.createdAt - a.createdAt)

    const mappedPosts = {
      posts: posts.map((post) => {
        return {
          post,
          nickname: user.find((item) => item.user_id === post.fk_user_id)["nickname"],
        }
      }),
    }

    res.status(200).json(mappedPosts)
  } catch (e) {
    console.log(e)
  }
})

//유저페이지 Myvelog 가져오기
router.get("/post/me", authMiddleWare, async (req, res) => {
  const { user_id } = res.locals.user

  try {
    //관계성 찾을때 include하면 해당모델까지 참조
    const userPosts = await User.findAll({
      where: { user_id },
      raw: true,
      attributes: ["nickname"],
      include: [
        { model: Post, attributes: ["post_id", "title", "content", "img_url", "createdAt"] },
      ],
    })
    userPosts.sort((a, b) => b.createdAt - a.createdAt)
    //console.log(userPosts)

    res.status(200).json(userPosts)
  } catch (e) {
    console.log(e)
  }
})

//게시글 상세페에지

router.get("/post/:post_id", async (req, res) => {
  const { post_id } = req.params

  const post = await Post.findOne({
    where: { post_id },
    attributes: ["post_id", "title", "img_url", "createdAt", "updatedAt"],
    raw: true,
  })
  res.status(200).json(post)
})

//게시물 작성하기
router.post("/post", upload.single("img_url"), authMiddleWare, async (req, res) => {
  //프론트가 보내는 정보들 (response들) body로 받아서 변수화
  const { title, content, img_url } = req.body
  //미들웨에어 따라 다르지만 res.local에 저장하면 사용자 찾기
  const { email } = res.locals.user

  const fk_user_id = await User.findOne({ where: { email }, raw: true })
  console.log(fk_user_id)
  try {
    const img_url = await req.file.location
    //DB에 Post 생성하기 위해서 create사용 (create과 save의 차이를 읽어보면 좋음)
    const post = await Post.create({
      //postId 는 자동으로 생성됨..model에 auto-increment있음
      title,
      content,
      img_url,
      //userId는 로그인사용자꺼 가져와야함, 임시로 1로 지정..글쓸라면 유저를 참조해야해서 외래키를 지정해야함
      fk_user_id: fk_user_id.user_id,
    })
    //성공했으니가 201(created)상태표시 후 post변수 리턴
    res.status(201).json(post)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

//게시물 수정하기

router.patch("/post/:post_id", authMiddleWare, async (req, res) => {
  // post/1 등 <== /1을 가져와야하니까 req.params 사용
  const { post_id } = req.params
  // 프론트서 보내는 정보 req.body로 변수화
  const { title, content, img_url } = req.body
  try {
    //DB에서 같은 post_id있는 사용자 찾기
    const checkPostId = await Post.findOne({ where: { post_id } })

    // 같은 post_id 사용자 찾았으면 업데이트 해 라고 명령하는거임
    const updatedPost = await checkPostId.update(
      {
        title,
        content,
        img_url,
      },
      //json객체 반환값으로 현재 업데이트된 문서를 보내기위해서 설정한다. plain은 기타내용제외 수정된정보만 원해서 설정.
      { returning: true, plain: true }
    )
    //업데이트 성공하면 프론트한테 보내줌
    res.status(200).json(updatedPost)
  } catch (e) {
    console.log(e)
  }
})

//게시물 삭제하기
router.delete("/post/:post_id", authMiddleWare, async (req, res) => {
  try {
    // 게시물 id 기준으로 삭제하기 때문에  req.params 함
    const { post_id } = req.params
    //findOne 할필욘없음, 사실 params로 post_id가 들어오니 그거가지구 바로 삭제가능함.
    const checkPostId = await Post.findOne({ where: { post_id } })
    //destroy 라는 문구가 해당 post 삭제함
    const deletePost = await checkPostId.destroy({
      where: {
        post_id,
      },
      //paranoid 가 deleteAt을 timestamp으로 만들어주기 때문에, 실제로 데이터베이스에서 삭제할라면 force:true한다.
      force: true,
    })
    //수정할 권한없으면 403(forbidden)
    if (!deletePost) {
      return res.status(403).send("존재하지 않는 포스트입니다.")
    }
    //삭제하는것이기 때문에 결과만 보내주기
    return res.status(200).json({ result: "success" })
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
})

module.exports = router
