const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const auth = require("./auth");
const bodyparser = require("body-parser");
const app = express();

const login = require("./routes/login-route");
const signup = require("./routes/signup-route");
const forgetPassword = require("./routes/forget-route");
const newpassword = require("./routes/new-password");
const dashboard = require("./routes/dashboard");
const signout = require("./routes/signout-route");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//middleware
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/forgetpassword", forgetPassword);
app.use("/", newpassword);
app.use("/api/showuser", dashboard);
app.use("/api/signout", auth, signout);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
