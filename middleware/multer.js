let multer = require("multer");
const path = require("path");

const classificationsStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./static/images/classifications");
  },
  filename: (req, file, cb) => {
    const filename = `${req.body.name.toLowerCase()}.svg`;
    const imageUrl = `\\images\\classifications\\${filename}`;
    req.body.imageUrl = imageUrl;
    if (filename) cb(null, filename);
  },
});

const classificationsFilter = (req, file, cb) => {
  if (file.mimetype !== "image/svg+xml" || !req.body.name) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

module.exports = {
  imgsUpload: multer({
    storage: classificationsStorage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: classificationsFilter,
  }),
};
