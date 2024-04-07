const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const bagRoutes = require("./routes/bagRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;
const dataBaseURI = process.env.dataBaseURI;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//routes
app.get("/", (req, res) => {
  res.send("hello world!");
});

//database
mongoose
  .connect(dataBaseURI)
  .then((result) =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

app.use(authRoutes);
app.use(favoriteRoutes);
app.use(bagRoutes);
