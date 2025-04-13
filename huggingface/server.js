import {HfInference} from "@huggingface/inference"
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para generar recetas
const SYSTEM_PROMPT = 
`You are an assistant that receives a list of ingredients that a user has and suggest a recipe they could make with some of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra  ingredients. Format your response in markdown to make it easier to render to a web page`

const hf = new HfInference(process.env.API_KEY)

export async function getRecipeFromMistral(ingredientsArr){
const ingredientsString = ingredientsArr.join(", ")
try{
const response = await hf.chatCompletion({
model:"mistralai/Mistral-7B-Instruct-v0.3",
messages: [
{role:"system", content: SYSTEM_PROMPT},
{role:"user",  content: `I have ${ingredientsString}. Please give me a recipe you’d recommend I make!`}
],
max_tokens: 1024,
})
return response.choices[0].message.content
}catch(err){
console.error(err.message)
return err;
}
}

app.post('/get-recipe', async (req, res) => {
    const { ingredients } = req.body; // Espera un array de ingredientes en el cuerpo de la solicitud
    try {
        const recipe = await getRecipeFromMistral(ingredients);
        res.json({ recipe });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
