require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutsRoutes = require("./routes/workouts");

// express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutsRoutes);

// connect to database
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(PORT, () => {
      // listen for requests
      console.log("connected to database and listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// listen for requests
const PORT = process.env.PORT;
