const express = require("express");
const app = express();
const port = 7304;
const ktpRouter = require("./routes/ktp.js");
const kkRouter = require("./routes/kartuKeluarga.js");
const detailRouter = require("./routes/detailKK.js");

// import body barser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hallo Sayang ❤️");
});

// route ktp
app.use("/api/ktp", ktpRouter);

// route kk
app.use("/api/kk", kkRouter);

// route detail kk
app.use("/api/detail", detailRouter);

app.listen(port, () => {
  console.log(`aplikasi sedang berjalan pada port: ${port}`);
});
