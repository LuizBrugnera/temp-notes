import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

export default app;
