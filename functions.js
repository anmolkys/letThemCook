const { GoogleGenerativeAI } = require("@google/generative-ai");
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');

require('dotenv').config();


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const imageModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });



async function getSummary(dataBuffer){
        try{
            const prompt = "Summarize the following text for me in under 300 words please and if it has multiple points or sub topics you can create points for them and extend the word limit keeping in mind the result text is short and crisp : "+dataBuffer
            let x = await model.generateContent(prompt);
            let text = await richTextFromMarkdown(x.response.text())
            return text
            console.log(x.response.text());
            }
        catch(error){
            return "Error Encountered-> "+error
            console.log(error);
        }
}

async function ask(dataBuffer,question){
        try{
            const prompt = "Answer this question "+question+" from this information provided and you have to interpret the information in the best way you can "+dataBuffer
            let x = await model.generateContent(prompt);
            let text = await richTextFromMarkdown(x.response.text())
            return text
            console.log(x.response.text());
            }
        catch(error){
            return "Error Encountered-> "+error
            console.log(error);
        }
}

async function getImage(image,res){
    const prompt = "You are an expert in nutritionist where you need to see the ingredient items from the image, identify the dish, and calculate the total calories giving the count of each calorie in it, also provide the viable and feasible healthy recipes we can cook from those ingredients if possible 1. Recipe 1 - small steps to understand 2. Recipe 2 - small steps to understand ---- ---- , if it is not an image of food then give a brief description of the image under 100 words and also tell in the response to use a Food image"
    try{
        let x = await imageModel.generateContent([prompt, image]);
        return x.response.text()
        console.log(x.response.text());
    }
    catch(error){
        return "Error Encountered-> "+error
        console.log(error);
    }
}


//getOutput(dataBuffer); -> takes the pdf text as the input and summarizes it
//ask(dataBuffer,question) -> takes the pdf text and question as an input

module.exports = {getSummary , ask , getImage}

