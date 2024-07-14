const express = require("express");
const articleRouter = require("./routes/articles");
const authRouter = require("./routes/auth");
const connectDB = require('./db');
const app = express();

app.set("view engine", "ejs");

// Connect to MongoDB
connectDB();

app.use(express.urlencoded({ extended: true }));

app.use("/articles", articleRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});
