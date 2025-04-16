import { pipeline } from "@xenova/transformers";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import serverless from 'serverless-http';

const pipe = await pipeline('sentiment-analysis');

const output = await pipe("I love using Hugging Face Transformers!")
console.log(output);

const app = express();
app.use(express.json());



app.post('/' , async (req, res) => {
    const result = await pipe(req.body.text);
    res.json(result);
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    console.log('Request for index.html received');
    res.sendFile(path.join(__dirname, 'index.html'));
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

export const handler = serverless(app);
export default app;

    