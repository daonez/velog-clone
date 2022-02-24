

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

### ERD
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/beeab95d-0d4f-4ef4-9d24-b236534ae778/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.27.38.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220224T083012Z&X-Amz-Expires=86400&X-Amz-Signature=de6d2e1e23436d2737157fe758f8a037b2f39cc754fac0441c07b0408a33e840&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202022-02-18%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE%25206.27.38.png%22&x-id=GetObject" title="MODEL"></img>

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
|                            | 삭제              | delete | /post/:post_id                     | header:{token},body: { id :user_id: number }                                     | { msg : ‘삭제완료!’ }                                                                     |
| 댓글                       | 댓글작성          | post   | /post/:post_id/comment             | header:{token},body: { content:string }                                          | { msg: ‘작성완료!’ }                                                                      |
|                            | 댓글수정          | put    | /post/:post_id/comment/:comment_id | header:{token},body: { content:string}                                           | { msg:’수정완료!’, comment }                                                              |
|                            | 댓글삭제          | delete | /post/:post_id/comment/:comment_id | header: {token}, body: {id: user_id : number(INT) }                              | { msg : ‘삭제완료!’ }                                                                     |
|                            | 댓글조회          | get    | /post/:post_id/comment             |                                                                                  | { comments, }                                                                                      |                                                                   