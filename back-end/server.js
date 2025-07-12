const express = require("express");
const { connectDb } = require("./utils/connectDb");
const apiRoutes = require("./apiRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(process.env.PORT || 3000, () => {
    connectDb();
    console.log(`Server is running on port ${process.env.PORT}`);
});