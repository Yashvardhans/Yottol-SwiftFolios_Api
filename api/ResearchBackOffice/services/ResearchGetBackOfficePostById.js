const { ExecuteQuery } = require("../../../utils/ExecuteQuery");

const ResearchGetBackOfficePostById = async (postId) => {
    try {
        const query = `
            SELECT 
                id,
                heading,
                description,
                file_url,
                video_url,
                thumbnail_url,
                date
            FROM 
                swift_research_post_details
            WHERE 
                id = ?
        `;

        const result = await ExecuteQuery(query, [postId]);

        if (result.length === 0) {
            return null; // Return null if no post is found
        }

        const postDetails = result[0]; // Extract the first (and only) row

        return {
            id: postDetails.id,
            heading: postDetails.heading,
            description: postDetails.description,
            file_url: postDetails.file_url,
            video_url: postDetails.video_url,
            thumbnail_url: postDetails.thumbnail_url,
            date: postDetails.date
        };
    } catch (error) {
        console.error("Error in ResearchGetBackOfficePostById:", error);
        throw error;
    }
};

module.exports = { ResearchGetBackOfficePostById };