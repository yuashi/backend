import mongoose from "mongoose";

const tiktokSchema = mongoose.Schema({
  url: String,
  channel: String,
  description: String,
  song: String,
  likes: Number,
  messages: Number,
  shares: Number,
});

//collection inside the database
export default mongoose.model("tiktokVideos", tiktokSchema);
