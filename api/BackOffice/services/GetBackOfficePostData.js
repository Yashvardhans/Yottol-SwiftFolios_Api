const { ExecuteQuery } = require("../../../utils/ExecuteQuery");


const GetBackOfficePostData = async () =>{
    try {
        const query = `
            SELECT 
                sr.id AS research_id,
                sr.stock_code,
                sr.related_stock,
                sr.post_id,
                srpd.id AS post_id,
                srpd.heading,
                srpd.description,
                srpd.file_url,
                srpd.video_url,
                srpd.thumbnail_url,
                srpd.date
            FROM 
                swiftresearch sr
            LEFT JOIN 
                swift_research_post_details srpd
            ON 
                JSON_CONTAINS(sr.post_id, JSON_ARRAY(srpd.id))
        `;
    
        const result = await ExecuteQuery(query);
    
        const transformedData = result.reduce((acc, row) => {
            const researchId = row.research_id;
    
            if (!acc[researchId]) {
                acc[researchId] = {
                    id: researchId,
                    stock_code: row.stock_code,
                    related_stock: JSON.parse(row.related_stock || "[]"),
                    post_details: []
                };
            }
    
            if (row.post_id) {
                acc[researchId].post_details.push({
                    id: row.post_id,
                    heading: row.heading,
                    description: row.description,
                    file_url: row.file_url,
                    video_url: row.video_url,
                    thumbnail_url: row.thumbnail_url,
                    date: row.date
                });
            }
    
            return acc;
        }, {});
    
        return Object.values(transformedData);
    } catch (error) {
        console.error("Error in GetSwiftResearchData:", error);
        throw error;
    }

}

module.exports = {GetBackOfficePostData}