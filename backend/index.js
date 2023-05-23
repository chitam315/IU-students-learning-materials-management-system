// const express = require("express");
import express from "express";
import cors from 'cors'

import router from "./routes/index.js";
import db from "./config/db/index.js";
import {PORT} from "./config/index.js"
import {catchError} from './app/middlewares/error.js'

const app = express();
app.use(cors())
// app.use(express.text());
app.use(express.json());

router(app);
app.use(catchError)

db.connect()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
