const { ExecuteQuery } = require("../../../utils/ExecuteQuery");

const ResearchAddBackOfficePostData = async ({
    id,
    heading,
    body,
    file_url,
    video_url,
    thumbnailFileUrl,
    post_id,
    date,
}) => {
    try {
        const postDetailsQuery = `
            INSERT INTO swift_research_post_details (
                id,
                heading,
                description,
                file_url,
                video_url,
                thumbnail_url,
                date
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const postDetailsParams = [
            post_id,
            heading,
            body,
            file_url,
            video_url,
            thumbnailFileUrl,
            date,
        ];

        await ExecuteQuery(postDetailsQuery, postDetailsParams);

        const swiftResearchQuery = `
            UPDATE swiftresearch
            SET post_id = JSON_ARRAY_APPEND(IFNULL(post_id, JSON_ARRAY()), '$', ?)
            WHERE id = ?
        `;

        const swiftResearchParams = [post_id, id];

        await ExecuteQuery(swiftResearchQuery, swiftResearchParams);

        return { success: true, message: "Data inserted successfully" };
    } catch (error) {
        console.error("Error in AddBackOfficePostData:", error);
        throw error;
    }
};

module.exports = { ResearchAddBackOfficePostData };