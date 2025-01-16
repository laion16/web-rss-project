import express from "express";
import Parser from "rss-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())

app.post("/rss", async (req, res) => {
    const {url} = req.body;
    if (!url) return res.status(400).send("URL requerida");
    try {
        const parser = new Parser();
        const feed = await parser.parseURL(url);
        res.json(feed);
    } catch (error) {
        res.status(500).send("Error al obtener el RSS");
    }
});

export default app