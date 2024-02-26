const routes = require("./routes");


const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require('body-parser');




app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '20mb' })); // Set limit to 10 megabytes
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(cors())
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;
http.listen(port,()=>{console.log(`[⚡] Listening on ${port}`)})