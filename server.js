const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🚀 Hello, ELEVATE_LAB,from Node.js CI/CD Pipeline by Vidumukhi Jadhav!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

