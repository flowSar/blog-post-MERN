import React from "react";
import type { PostInterface } from "../../utils/types";
import LinearPostCard from "../../components/LinearPostCard";

interface PostsProps {
  posts: PostInterface[];
}

function Posts({ posts }: PostsProps) {
  return (
    <div className='grid grid-cols-1 gap-y-4 p-2'>
      {posts.map((post) => (
        <LinearPostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
