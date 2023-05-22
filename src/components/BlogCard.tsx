import type { NextPage } from "next";
import Link from "next/link";
import { FC } from "react";

interface IBlogCardProps {
  className?: string;
  title: string;
  desc: string;
  slug: string;
}

const BlogCard: FC<IBlogCardProps> = (props): JSX.Element => {
  const { title, desc, slug } = props;
  return (
    <Link className="block" href={"/blogs/" + slug}>
      <div className="bg-blue-100 p-2 rounded cursoir-pointer">
        <h1 className="text-gray-900 text-3xl font-semibold">{title}</h1>
        <p className="text-gray-500">{desc}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
