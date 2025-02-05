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
  post_id,
  date,
}) => {
  const post_query = `
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

  const post_params = [
    post_id,
    heading,
    body,
    file_url,
    video_url,
    thumbnailFileUrl,
    date,
  ];
  const query = `
        INSERT INTO swiftresearch (
            id,
            related_stock,
            stock_code,
            post_id
        ) VALUES (?, ?, ?, JSON_ARRAY(?))
    `;

  const params = [id, relatedStockData, stockData, post_id];
  console.log("params", params);

  try {
    const result1 = await ExecuteQuery(query, params);
    const result2 = await ExecuteQuery(post_query,post_params)
    
  } catch (error) {
    console.error("Error in AddSwiftFoliosData:", error);
    throw error;
  }
};

module.exports = { AddSwiftFoliosFormData };
