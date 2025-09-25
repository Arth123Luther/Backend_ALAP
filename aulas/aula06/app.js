const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const tarefasRouter = require("./routes/tarefaRouter");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/tarefas", tarefasRouter);


module.exports = app;
