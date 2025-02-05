const multer = require("multer");

const BackOffice = require("express").Router();

const fs = require("fs");
const path = require("path");

const {
  AddBackOfficePostDataController,
  GetBackOfficePostDataController,
  EditBackOfficePostDataController,
  EditBackOfficePostStockDataController,
} = require("../BackOffice/controllers/BackOfficeMainContoller");

const GenerateID = (length) => {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, "0");
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../Uploads/");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    console.log(file);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log("Original File Name", file.originalname);
    if (!file.fieldname) {
      cb(null);
    }

    const filename = GenerateID(13) + file.originalname.match(/\..*$/)[0];
    req.body[file.fieldname] = filename;
    cb(null, filename);
  },
});

const multiple_upload = multer({ storage }).any();

BackOffice.post("/post/add", multiple_upload, AddBackOfficePostDataController);
BackOffice.get("/post/get", GetBackOfficePostDataController);
BackOffice.put(
  "/post/:postId/update",
  multiple_upload,
  EditBackOfficePostDataController
);
BackOffice.put("/post/stock/:postId/edit",multiple_upload,EditBackOfficePostStockDataController);

module.exports = { BackOffice };
