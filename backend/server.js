const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

//app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true, origin:"http://localhost:3000"}));

app.use("/api", router); // "banannas" => "api/banannas"

app.use((error, req, res, next)=>{
    res.sendStatus(404).json({error});
});

app.listen(PORT, ()=>{console.log(`App listening at http://localhost:${PORT}`)});