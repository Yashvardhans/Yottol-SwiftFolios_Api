
const {GetVisitStatus} = require("../../services/GetVisitStatus")
const {AddVisitStatus} = require("../../services/AddVisitStatus")

const AddVisitStatusController = async(req,res) =>{
    try {
        const {account_code,item_id,visit_status} = req.body;
    console.log("body",req.body);
    await AddVisitStatus(account_code,item_id,visit_status)
    res.status(200).json({message:"Data added"})
    
    } catch (error) {
        console.log("error in updating visit status",error);
        
    }

}
const GetVisitStatusController  =async(req,res)=>{
    const response  = await GetVisitStatus()
    res.status(200).json({data : response})
}

module.exports = {AddVisitStatusController,GetVisitStatusController}