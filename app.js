require("dotenv").config();
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// Swagger Related
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(cookieParser());

// Swagger Document Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Logger Middleware
app.use(morgan("tiny"));

// Routes

const user = require("./routes/user");
const offer = require("./routes/offer");
const order = require("./routes/order");

//Route Middleware

app.use("/api/v1", user);
app.use("/api/v1", offer);
app.use("/api/v1", order);

app.use(errorHandler);

// Comment in Local Mode
// After Scripts
// "proxy": "http://localhost:8000",
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

module.exports = app;
