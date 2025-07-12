const express = require("express");
const { connectDb } = require("./utils/connectDb");
const apiRoutes = require("./apiRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", apiRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT || 3000, () => {
    connectDb();
    console.log(`Server is running on port ${process.env.PORT}`);
});