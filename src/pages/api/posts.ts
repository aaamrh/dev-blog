// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Data =
  | {
      postInfo: any;
    }
  | string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const data = readPostsInfo();
      res.status(200).json({ postInfo: data });
    default:
      return res.status(404).send("Not Found");
  }
}

const readPostsInfo = () => {
  // console.log("cwd", process.cwd());
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);

  return dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + filename);
    const fileContent = fs.readFileSync(filePathToRead, "utf-8");

    // console.log("fileContent", matter(fileContent));
    return matter(fileContent).data;
  });
};
