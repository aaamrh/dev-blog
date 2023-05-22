import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostApiResponse } from "@/utils/types";

export const readPostsInfo = (): PostApiResponse => {
  // console.log("cwd", process.cwd());
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);

  return dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + filename);
    const fileContent = fs.readFileSync(filePathToRead, "utf-8");

    // console.log("fileContent", matter(fileContent));
    return matter(fileContent).data;
  }) as PostApiResponse;
};
