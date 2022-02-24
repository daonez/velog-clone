

## 🔨사용한 기술 스택


### 🖥 Back-End 기술스택

|   이름   |        설명        |
| :------: | :----------------: |
| Node.js  | Javascript Runtime |
| Express  |   Web Framework    |
|  MySQL|      Database      |
|Sequelize|ORM


<br><br>

## 📒 라이브러리

|        name        |       Appliance       | version  |
| :----------------: | :-------------------: | :------: |
|      aws-sdk       |        S3 bucket 접근        | 2.1073.0 |
|   bcrypt    |   encrypt    |  5.0.1   |
|        cors        | Request resource 제한 |  2.8.5   |
|       dotenv       |     환경변수 설정     |  16.0.0  |
|express|nodejs Framework|4.17.3
|  jsonwebtoken   |  유저 인증   |  8.5.1   |
|       multer       |  이미지 데이터 처리   |  1.4.4   |
|     multer-S3      |   사진 파일 업로드    |  2.10.0  |
|mysql2|Database|2.3.3
| nodemon|     server monitor restarter       |  2.0.15   |
|  s3   |   AWS bucket   |  2.0.0  |
|sequelize|ORM|6.16.1
|sequelize-cli|ORM config helper| 6.4.1


<br><br>

## :golf: Deploy

|Deploy|
|-|
| EC2   |   
| AWS S3|


<br><br>



### API
| 분류                     | 기능              | Method | API - URL                          | request(client=>server)                                                          | response(server=>client)                                                                  |
| -------------------------- | ----------------- | ------ | ---------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 회원관리                   | 회원가입          | post   | /join                              | { email:string, password: string, nickname: string }                             | {{msg : ‘회원가입 완료!’})                                                                |
|                            | 중복체크          | post   | /join/checkid                      | { user_id: string, }                                                             |                                                                                           |
|                            | 로그인            | post   | /login                             | { email:abc@abc.com password: string }                                           | 성공시:{{msg : “로그인성공””}}, {{token : string}} 실패시: {{msg: “로그인 실패했습니다”}} |
| 메인페이지 게시글 불러오기 |                   | get    | /post                              |                                                                                  | {{post: img,title,content,createdAt,comments,nickname}}                                   |
| 유저페이지 -(내 벨로그)    | 유저페이지 벨로그 | get    | /post/me                           | headers{token},                                                                  | {posts}                                                                                   |
| 게시글 출간하기            | 출간하기(글작성)  | post   | /post                              | headers:{token} body (formData){ title: string content: string img_url(string) } | { msg : ‘작성완료!’ }                                                                     |
| 상세페이지 게시글          | 상세페이지        | get    | /post/:post_id                     |                                                                                  | {posts : title,nickname,createdAt,img,content,, comments}                                 |
|                            | 수정              | patch  | /post/:post_id                     | headers:{token} body: {postId: string, title: string content: string }           | { msg : ‘수정완료!’ postid에 맞는 수정된데이터 객체 }                                     |
|                            | 삭제              | delete | /post/:post_id                     | header:{token},body: { id :user_id: number }                                     | { msg : ‘삭제완료!’ }                                                                     |
| 댓글                       | 댓글작성          | post   | /post/:post_id/comment             | header:{token},body: { content:string }                                          | { msg: ‘작성완료!’ }                                                                      |
|                            | 댓글수정          | put    | /post/:post_id/comment/:comment_id | header:{token},body: { content:string}                                           | { msg:’수정완료!’, comment }                                                              |
|                            | 댓글삭제          | delete | /post/:post_id/comment/:comment_id | header: {token}, body: {id: user_id : number(INT) }                              | { msg : ‘삭제완료!’ }                                                                     |
|                            | 댓글조회          | get    | /post/:post_id/comment             |                                                                                  | { comments, }                                                                                      |                                                                   