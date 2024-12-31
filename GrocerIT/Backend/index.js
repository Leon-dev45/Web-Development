const express = require("express");
const { json } = require("express");
const cors = require("cors");
const connectToMongo = require("./db");

const app = express();
const port = 5000;
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Showing json to console
app.use(json());
//User Logic
app.use("/api/auth", require("./routes/auth").default);
//Product Logic
app.use("/api", require("./routes/products").default);
//Comment Logic
app.use("/api", require("./routes/comments").default);
//Dashboard Logic
app.use("/api", require("./routes/dashboard").default);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
