import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: "ap-northeast-2"
});

//const upload = multer({ dest: "uploads/" }); 이것은 하드에 쓸때 하는 것임
//업로드 되는 파일 위치를 나타낸다

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "prismakang",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const {
    file: { location }
  } = req;
  res.json({ location });
};

// S3는 path가 아니라 location이라 한다. 
