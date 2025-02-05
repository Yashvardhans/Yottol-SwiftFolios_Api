const { ExecuteQuery } = require("../../../utils/ExecuteQuery");

const EditBackOfficePostData = async ({post_id,
    heading,
    body: description,
    file_url,
    thumbnailFileUrl: thumbnail_url,
    video_url,
    date,}) => {


        const query = `
        UPDATE swift_research_post_details
        SET 
          heading = ?,
          description = ?,
          file_url = ?,
          thumbnail_url = ?,
          video_url = ?,
          date = ?
        WHERE id = ?`;
    

    const params = [
        heading,
        description,
        file_url,
        thumbnail_url,
        video_url,
        date,
        post_id,
    ];

    try {
        const result = await ExecuteQuery(query,params);
        console.log("res",result);
        

    } catch (error) {
        console.error("Error updating post details:", error);
        throw error;
    }
};

module.exports = { EditBackOfficePostData };
