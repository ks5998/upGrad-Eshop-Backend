const config = require("config");
const products = require("./Controllers/product_Controller");
const auth = require("./Controllers/auth");
const addresses = require("./Controllers/address_Controller");
const orders = require("./Controllers/order_Controller");
const users = require("./Controllers/user_Controller");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
const express = require("express");
const app = express();
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));


if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1); // 0 means success anything else means failure, so if jwtPrivateKey is not set we get error and process exit.
}


mongoose
  .connect("mongodb://localhost/upGrad_Eshop_application")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.error("Couldnot connected to database"));


app.use(express.json());
app.use("/products", products);
app.use("/addresses", addresses);
app.use("/orders", orders);
app.use("/users", users);
app.use("/auth", auth);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));