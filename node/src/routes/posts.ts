import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Post } from "../models/post";

const router = express.Router();

router.get("/api/node/posts", async (req: Request, res: Response) => {
  const posts = await Post.find({});
  res.send(posts);
});

router.post(
  "/api/node/posts",
  [body("title").notEmpty().withMessage("タイトルは必須です")],
  async (req: Request, res: Response) => {
    const { title } = req.body;

    const post = Post.build({
      title,
    });
    await post.save();
    res.status(201).send(post);
  }
);

export { router as postsRouter };
