const express = require('express')
const app = express()


// const {SwiftFoliosResearchForm} = require("../api/SwiftFoliosResearchForm")

const swiftFoliosForm = (req, res, next) => {
    res.send('SwiftFolios form route works!');
};


app.use("/swift-folios-form",swiftFoliosForm)





module.exports = app