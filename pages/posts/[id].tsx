import { Article } from "@components/Article";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next";
import { Post } from "../index";

const BlogPost = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { body: POST_BODY, title: POST_TITLE }: Post = post;

  return (
    <Article>
      <h1>{POST_TITLE}</h1>
      <p>{POST_BODY}</p>
    </Article>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  const paths = posts.map(({ id: POST_ID }: Post) => ({
    params: { id: POST_ID.toString() }
  }));

  return {
    fallback: false,
    paths
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const res = await fetch(
    `http://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post: Post = await res.json();

  return {
    props: {
      post
    }
  };
};