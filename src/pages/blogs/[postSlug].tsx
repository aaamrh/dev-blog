import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { ParsedUrlQuery } from "querystring";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";

type IBlogProps = InferGetStaticPropsType<typeof getStaticProps>;

const Blog: NextPage<IBlogProps> = (props) => {
  const { post = { title: "", content: "" as any } } = props;
  const { title, content } = post;

  const router = useRouter();

  if (router.isFallback) {
    return (
      <p
        style={{
          fontSize: 64,
        }}
      >
        loading ...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-semibold text-2xl py-5">{title}</h1>
      <div className="prose pb-10">
        <MDXRemote {...content} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  // 读 path
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);

  console.log("dirs", dirs);

  const paths = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + filename);
    const fileContent = fs.readFileSync(filePathToRead, "utf-8");

    return {
      params: {
        postSlug: matter(fileContent).data.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};
export const getStaticProps: GetStaticProps<Post> = async (context) => {
  try {
    const { params } = context;
    const { postSlug } = params as IStaticProps;

    const filePathToRead = path.join(
      process.cwd(),
      "posts/" + postSlug + ".md"
    );
    const fileContent = fs.readFileSync(filePathToRead, "utf-8");

    // const { content, data } = matter(fileContent);
    // const source = await serialize(content);

    const source: any = await serialize(fileContent, {
      parseFrontmatter: true,
    });

    return {
      props: {
        post: {
          content: source,
          title: source.frontmatter.title,
        },
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Blog;
