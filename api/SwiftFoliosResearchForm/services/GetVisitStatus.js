const { ExecuteQuery } = require("../../../utils/ExecuteQuery")

const GetVisitStatus = async() =>{
    try {
        const query ="SELECT * FROM swift_research_visit_status"
    
    const request = await ExecuteQuery(query)
    return request
    } catch (error) {
        
    }
}

module.exports = {GetVisitStatus}