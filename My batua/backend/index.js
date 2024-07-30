require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  return res.json({
    message: "Invalid Request",
  });
});

app.listen(process.env.PORT);