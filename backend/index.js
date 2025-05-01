import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.listen(8000, () =>{
    console.log("Servidor rodando na porta 8000!!!")
})