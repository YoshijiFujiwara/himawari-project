import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log("start!!!!!...fuga.sss"); // test commit

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI が定義されていません");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDBに接続しました");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000 @node");
  });
};

start();
