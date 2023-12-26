const express = require("express");
const app = express();
const route = require("./Route/route");

app.use(express.json());

app.use("/api", route);

app.listen(8000, () => console.log("Server on!"));
