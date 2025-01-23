const { ExecuteQuery } = require("../../../utils/ExecuteQuery");

const GetSwiftFoliosFormData = async () => {
  const query = `SELECT * FROM swiftresearch`;

  try {
    const results = await ExecuteQuery(query);
    return results;
  } catch (error) {
    console.error("Error in GetSwiftFoliosData:", error);
    throw error;
  }
};

module.exports = { GetSwiftFoliosFormData };
