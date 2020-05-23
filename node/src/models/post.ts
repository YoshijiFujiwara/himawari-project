import mongoose from "mongoose";

interface PostAttrs {
  title: string;
}

interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

interface PostDoc extends mongoose.Document {
  title: string;
}

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

postSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
