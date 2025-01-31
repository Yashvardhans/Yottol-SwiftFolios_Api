const { ExecuteQuery } = require("../../../utils/ExecuteQuery");

const AddSwiftFoliosFormData = async ({
    id,
    heading,
    body,
    relatedStockData,
    stockData,
    file_url,
    video_url,
    thumbnailFileUrl,
    date
}) => {
    const query = `
        INSERT INTO swiftresearch (
            id,
            heading,
            description,
            related_stock,
            stock_code,
            file_url,
            video_url,
            thumbnail_url,
            date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const params = [
        id,
        heading,
        body,
        relatedStockData,
        stockData,
        file_url,
        video_url,
        thumbnailFileUrl,
        date
    ];
    console.log("params",params);
    

    try {
        const result = await ExecuteQuery(query, params);
        return result;
    } catch (error) {
        console.error("Error in AddSwiftFoliosData:", error);
        throw error;
    }
};

module.exports = { AddSwiftFoliosFormData };
