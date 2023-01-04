const express = require("express");
const app = express();
const cors = require("cors");
const toolsRoute = require("./routes/v1/product.route");
const barandRoute = require("./routes/v1/brand.route");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1/product", toolsRoute);
app.use("/api/v1/brand", barandRoute);
module.exports = app;
