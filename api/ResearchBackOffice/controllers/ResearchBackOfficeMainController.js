const { ResearchAddBackOfficePostData } = require("../services/ResearchAddBackOfficePostData");
const { ResearchGetBackOfficePostData } = require("../services/ResearchGetBackOfficePostData");
const {ResearchEditBackOfficePostStockData} = require("../services/ResearchEditBackOfficePostStockData")
const {ResearchEditBackOfficePostData} = require("../services/ResearchEditBackOfficePostData")
const { UploadToAwsBucket } = require("../../../utils/UploadToAwsBucket");


const ResearchAddBackOfficePostDataController = async (req, res) => {
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
      file_url += `_${file.originalname}`;
    }
    if (videoFile) {
      videoFileUrl = await UploadToAwsBucket(videoFile.filename);
      videoFileUrl += `_${videoFile.originalname}`
    }

    if (thumbnailFile) {
      thumbnailFileUrl = await UploadToAwsBucket(thumbnailFile.filename);
      thumbnailFileUrl += `_${thumbnailFile.originalname}`
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

    await ResearchAddBackOfficePostData(backOfficePostData);

    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error in BackOfficePostController:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const ResearchGetBackOfficePostDataController = async (req, res) => {
  try {
    const data = await ResearchGetBackOfficePostData();
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("Error", error);
  }
};
const ResearchEditBackOfficePostDataController = async (req, res) => {
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
      file_url += `_${file.originalname}`;
      console.log(file_url);
    }
    if (videoFile) {
      videoFileUrl = await UploadToAwsBucket(videoFile.filename);
      videoFileUrl += `_${videoFile.originalname}`;
    }

    if (thumbnailFile) {
      thumbnailFileUrl = await UploadToAwsBucket(thumbnailFile.filename);
      thumbnailFileUrl += `_${thumbnailFile.originalname}`
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

    await ResearchEditBackOfficePostData(backOfficePostEditData);

    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ message: "Failed to update post", error: error.message });
  }
};

const ResearchEditBackOfficePostStockDataController = async (req, res) => {
    try {
      const { postId } = req.params;
      const { stockData, relatedStockData } = req.body;
      console.log("body",req.body);
      
      const result = await ResearchEditBackOfficePostStockData({ postId, stockCode:stockData,  relatedStockCode:relatedStockData });
      res.status(200).json({ message: "Stock updated successfully", result });
    } catch (error) {
      console.error("Error updating stock:", error);
      res.status(500).json({ message: "Failed to update stock", error: error.message });
    }
  };
  
module.exports = {
  ResearchAddBackOfficePostDataController,
  ResearchGetBackOfficePostDataController,
  ResearchEditBackOfficePostDataController,
  ResearchEditBackOfficePostStockDataController
};
