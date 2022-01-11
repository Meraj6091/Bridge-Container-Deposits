const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routesUrls = require("./routes/router");
dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, (err) => {
  if (err) {
    console.log(err);
  } else console.log("database connected");
});
app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);
app.listen(4000, () => console.log("server is running"));
