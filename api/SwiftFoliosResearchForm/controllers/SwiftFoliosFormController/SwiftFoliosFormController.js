const { AddSwiftFoliosFormData } =  require("../../services/AddSwiftFoliosFormData");
const { GetSwiftFoliosFormData } = require("../../services/GetSwiftFoliosFormData");


const PostSwiftFoliosFormDataController = async (req, res) => {
    try {
        const { id, heading, body, stockData,  videoURL } = req.body;
        const file = req.files?.file;
        const relatedStockData = JSON.parse(req.body.relatedStockData);

        const videoFile = req.files?.videoFile;
        const thumbnailFile = req.files?.thumbnailFile;

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

        
        const swiftFoliosData = {
            id,
            heading,
            body,
            relatedStockData,
            stockData,
            file_url,
            thumbnailFileUrl,
            video_url: videoFileUrl || videoURL || null
        };
        

        
        console.log({id,
            heading,
            body,
            relatedStockData,
            stockData,
            file_url,
            thumbnailFileUrl})
            console.log(swiftFoliosData);
            

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