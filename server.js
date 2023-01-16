const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodeHtmlToImage = require("node-html-to-image");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/certificate", (req, res) => {
//   res.render("certificate");
// });

app.post("/certificate", (req, res) => {
  const { certification, awardee, description, date } = req.body;
  console.log(req.body);
  res.render(
    "certificate",
    { certification, awardee, description, date },
    async (err, html) => {
      console.log(html, err);
      const image = await nodeHtmlToImage({
        output: "./public/image.png",
        html: html,
        selector: "div.certificate",
        quality: 100,
      })
        .then(() => "Created successfully!")
        .catch((err) => console.log(err));
      res.redirect("http://localhost:8000/image.png");
    }
  );
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server listening on port 8000");
});
