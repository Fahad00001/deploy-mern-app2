const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ExpenseRouter =require('./Routes/ExpenseRouter');
const ensureAuthenticated = require("./Middlewares/Auth");

require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT || 8081;

app.get("/ping", (req, res) => {
  res.send("pog");
});
// middleware

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use('/expenses',ensureAuthenticated, ExpenseRouter)

app.listen(PORT, () => {
  console.log(`server is running on  ${PORT}`);
});
// QChMPWhgyaL3OE8P
