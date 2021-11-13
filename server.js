const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/books");

const mongoose = require("mongoose");
const { mongoURI, port } = require("./config");

const uri = `${mongoURI}`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
        console.log(`You are connected. Listening on port ${port}.`);
      });
      
  })
  .catch(console.error);

  if(port == null || port == "") {
    port = 8000;
  }

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use("/books", bookRoutes);

app.use(express.static("public"));
