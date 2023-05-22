import BlogCard from "@/components/BlogCard";
import type { NextPage, InferGetStaticPropsType } from "next";
import { readPostsInfo } from "../../../lib/helper";
import { PostApiResponse } from "@/utils/types";

// interface PostApiResponse {
//   postInfo: {
//     title: string;
//     slug: string;
//     meta: string;
//   }[];
// }

export const getStaticProps = async () => {
  // NOTE https://nextjs.org/learn/basics/api-routes/api-routes-details
  
  // const { postInfo }: PostApiResponse = await fetch(
  //   "http://localhost:3000/api/posts"
  // ).then((data) => data.json());

  const postInfo: PostApiResponse = readPostsInfo();

  return {
    props: {
      postInfo: postInfo,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<Props> = (props) => {
  const { postInfo } = props;

  return (
    <div className="max-w-3xl mx-auto p-5 space-y-4">
      {postInfo.map((post, i) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          desc={post.meta}
          slug={post.slug}
        />
      ))}
    </div>
  );
};

export default Blogs;
