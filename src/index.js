const express = require("express");
const config = require("./config/index");
const Router = require("./routes/index");

const app = express();

app.use(express.json());
app.use(Router);

const PORT = config.app.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running at PORT: ${PORT}`);
});
