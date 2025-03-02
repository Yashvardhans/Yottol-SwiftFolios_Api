const express = require('express')
const app = express()


const {SwiftFoliosForm} = require("../api/SwiftFoliosResearchForm")
const {ResearchBackOffice} = require("../api/ResearchBackOffice")



app.use("/swift-folios-research",SwiftFoliosForm)
app.use("/back-office",ResearchBackOffice)





module.exports = app