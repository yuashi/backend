import express from "express";
import mongoose from "mongoose";
import tiktokVideos from "./dbModel.js";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});

//DB config
const connection_url =
  "mongodb+srv://ayushi:4YKzJYnuWIRoz5Eq@cluster0.scn3v.mongodb.net/tiktokDb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//api endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello There !");
});

app.post("/api/posts", (req, res) => {
  const dbVideos = req.body;
  tiktokVideos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send("Unable to post the data to the server");
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/api/posts", (req, res) => {
  tiktokVideos.find((err, data) => {
    if (err) {
      res.status(500).send("Unable to get the data from the server");
    } else {
      res.status(200).send(data);
    }
  });
});

//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
