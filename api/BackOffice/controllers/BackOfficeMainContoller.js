const { AddBackOfficePostData } = require("../services/AddBackOfficePostData");
const { GetBackOfficePostData } = require("../services/GetBackOfficePostData");
const {EditBackOfficePostStockData} = require("../services/EditBackOfficePostStockData")
const {EditBackOfficePostData} = require("../services/EditBackOfficePostData")
const { UploadToAwsBucket } = require("../../../utils/UploadToAwsBucket");


const AddBackOfficePostDataController = async (req, res) => {
  try {
    const { id, heading, body, videoUrl, postId } = req.body;
    const file = req.files?.find((file) => file.fieldname === "file");
    const date = JSON.parse(req.body.date);
    console.log("req.file       ", req.files);
    console.log("req.body", req.body);

    const videoFile = req.files?.find((file) => file.fieldname === "videoFile");
    const thumbnailFile = req.files?.find(
      (file) => file.fieldname === "thumbnailFile"
    );
    console.log(file, videoFile);
    let file_url = null;
    let videoFileUrl = null;
    let thumbnailFileUrl = null;

    if (file) {
      file_url = await UploadToAwsBucket(file.filename);
      console.log(file_url);
    }
    if (videoFile) {
      videoFileUrl = await UploadToAwsBucket(videoFile.filename);
    }

    if (thumbnailFile) {
      thumbnailFileUrl = await UploadToAwsBucket(thumbnailFile.filename);
    }

    const backOfficePostData = {
      id,
      heading,
      body,
      file_url,
      thumbnailFileUrl,
      post_id: postId,
      video_url: videoFileUrl || videoUrl || null,
      date,
    };

    await AddBackOfficePostData(backOfficePostData);

    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error in BackOfficePostController:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const GetBackOfficePostDataController = async (req, res) => {
  try {
    const data = await GetBackOfficePostData();
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("Error", error);
  }
};
const EditBackOfficePostDataController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { id, heading, body, videoUrl } = req.body;
    const file = req.files?.find((file) => file.fieldname === "file");
    const date = JSON.parse(req.body.date);
    console.log("edit files       ", req.files);
    console.log("edit data", req.body);
    console.log("postId", postId);

    const videoFile = req.files?.find((file) => file.fieldname === "videoFile");
    const thumbnailFile = req.files?.find(
      (file) => file.fieldname === "thumbnailFile"
    );

    let file_url = null;
    let videoFileUrl = null;
    let thumbnailFileUrl = null;

    if (file) {
      file_url = await UploadToAwsBucket(file.filename);
      console.log(file_url);
    }
    if (videoFile) {
      videoFileUrl = await UploadToAwsBucket(videoFile.filename);
    }

    if (thumbnailFile) {
      thumbnailFileUrl = await UploadToAwsBucket(thumbnailFile.filename);
    }
    console.log("thmb",thumbnailFileUrl)
    const backOfficePostEditData = {
      heading,
      body,
      file_url,
      thumbnail_url: thumbnailFileUrl,
      post_id: postId,
      video_url: videoFileUrl || videoUrl || null,
      date,
    };

    await EditBackOfficePostData(backOfficePostEditData);

    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ message: "Failed to update post", error: error.message });
  }
};

const EditBackOfficePostStockDataController = async (req, res) => {
    try {
      const { postId } = req.params;
      const { stockData, relatedStockData } = req.body;
      console.log("body",req.body);
      
      const result = await EditBackOfficePostStockData({ postId, stockCode:stockData,  relatedStockCode:relatedStockData });
      res.status(200).json({ message: "Stock updated successfully", result });
    } catch (error) {
      console.error("Error updating stock:", error);
      res.status(500).json({ message: "Failed to update stock", error: error.message });
    }
  };
  
module.exports = {
  AddBackOfficePostDataController,
  GetBackOfficePostDataController,
  EditBackOfficePostDataController,
  EditBackOfficePostStockDataController
};
