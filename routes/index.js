const express = require('express')
const app = express()


const {SwiftFoliosForm} = require("../api/SwiftFoliosResearchForm")



app.use("/swift-folios-research",SwiftFoliosForm)





module.exports = app