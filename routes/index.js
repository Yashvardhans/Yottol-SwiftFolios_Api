const express = require('express')
const app = express()


const {SwiftFoliosForm} = require("../api/SwiftFoliosResearchForm")
const {BackOffice} = require("../api/BackOffice")



app.use("/swift-folios-research",SwiftFoliosForm)
app.use("/back-office",BackOffice)





module.exports = app