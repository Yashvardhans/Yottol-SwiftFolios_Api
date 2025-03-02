const { ExecuteQuery } = require("../../../utils/ExecuteQuery");

const ResearchEditBackOfficePostStockData = async ({ postId, stockCode, relatedStockCode }) => {
  const query = `
    UPDATE swiftresearch
    SET 
      stock_code = ?,
      related_stock = ?
    WHERE id = ?`;
  
  const params = [stockCode, relatedStockCode, postId];
  console.log("params",params);
  


  try {
    const result = await ExecuteQuery(query, params);
    console.log("Result",result);
    
    return result;
  } catch (error) {
    console.error("Error updating stock data:", error);
    throw error;
  }
};

module.exports = { ResearchEditBackOfficePostStockData };
