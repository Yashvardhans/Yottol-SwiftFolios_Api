const { AddSwiftFoliosFormData } =  require("../../services/AddSwiftFoliosFormData");
const { GetSwiftFoliosFormData } = require("../../services/GetSwiftFoliosFormData");
const {UploadToAwsBucket} = require("../../../../utils/UploadToAwsBucket");

const PostSwiftFoliosFormDataController = async (req, res) => {
    try {
        const { id, heading, body, stockData,relatedStockData,  videoUrl ,postId} = req.body;
        const file = req.files?.find(file => file.fieldname === 'file');
        const date = JSON.parse(req.body.date);
        console.log("req.file       ",req.files);
        console.log("req.body",req.body);
        
        

        const videoFile = req.files?.find(file => file.fieldname === 'videoFile');
        const thumbnailFile = req.files?.find(file => file.fieldname === 'thumbnailFile');;
        console.log(file,videoFile)
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
        
        const swiftFoliosData = {
            id,
            heading,
            body,
            relatedStockData,
            stockData,
            file_url,
            thumbnailFileUrl,
            post_id : postId,
            video_url: videoFileUrl || videoUrl || null,
            date
        };
        

        
        
            console.log(swiftFoliosData);
            console.log("date",date);
            
            

        await AddSwiftFoliosFormData(swiftFoliosData);

        res.status(200).json({ message: "Data added successfully" });
    } catch (error) {
        console.error("Error in PostSwiftFoliosFormDataController:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const GetSwiftFoliosFormDataController = async (req, res) => {
    try {
        const swiftFoliosData = await GetSwiftFoliosFormData();
        res.status(200).json({ message: "Data retrieved successfully", data: swiftFoliosData });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {PostSwiftFoliosFormDataController,GetSwiftFoliosFormDataController}