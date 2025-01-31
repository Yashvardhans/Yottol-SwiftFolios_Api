const { ExecuteQuery } = require("../../../utils/ExecuteQuery");

const AddVisitStatus = async (account_code, item_id, visitStatus) => {
  try {
    const query =
      "INSERT INTO swift_research_visit_status VALUES (?,?,?) ON DUPLICATE KEY UPDATE visit_status = ?";
    const params = [account_code, item_id, visitStatus,visitStatus];
    const request = await ExecuteQuery(query, params);
  } catch (error) {}
};

module.exports = { AddVisitStatus };
