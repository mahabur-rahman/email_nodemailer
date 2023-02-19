require("dotenv").config();

const express = require("express");
const router = require("./routes/router");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use("/api", router);

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at port no: ${PORT}`);
});
