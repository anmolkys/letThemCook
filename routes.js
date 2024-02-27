const {getSummary ,  ask , getImage} = require("./functions.js")
const express = require("express");

const app = express();

//check server status
app.get("/ping",(req,res)=>{
    res.send({status:"[⚡] Server is Live !!"})
})


//summarise the text 
app.post("/summary",async (req,res)=>{
    console.log("req recieved")
    let text = req.body.text
    const gem = await getSummary(text);
    res.send({output:gem})
})

//ask question from text (sent by client from pdf)
app.post("/ask",async (req,res)=>{
    let {text,question} = req.body
    const gem = await ask(text,question);
    res.send({output:gem})
})

// get description of the image (food,else)
app.post("/imageupload", async (req,res)=>{
    const imageDataUrl = req.body.inlineData.data;
    const imageMimeType = req.body.inlineData.mimeType;
    const image = {
        inlineData: {
            data: imageDataUrl,
            mimeType: imageMimeType,
        },
    };
    let text = await getImage(image, res);
    res.send({output:text});
})

module.exports = app;
