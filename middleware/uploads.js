const AWS = require("aws-sdk")
const multer = require("multer")
const multerS3 = require("multer-s3")
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKENT_REGION, BUCKET_NAME } = process.env

//dot env 로 환경변수 모두 숨김
const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: BUCKENT_REGION,
})

//upload 라는 변수에 multer를 사용하여 s3에 원하는 형태의 파일 형식을 저장
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 1000).toString() +
          Date.now() +
          "." +
          file.originalname.split(".").pop()
      )
    },
  }),
  limits: { fileSize: 1000 * 1000 * 10 },
})

exports.upload = multer(upload)
