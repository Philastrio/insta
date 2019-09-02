import multer from "multer";

const upload = multer({ dest: "uploads/" });
//업로드 되는 파일 위치를 나타낸다
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const { file } = req;
  console.log(file);
  res.end();
};
