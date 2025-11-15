import { useEffect, useState } from "react";
import PostsIcon from "../components/icons/PostsIcon";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../services/api/PostApi";
import type { PostInterface } from "../utils/types";

function Home() {
  const [post, setPosts] = useState<PostInterface[]>([]);
  useEffect(() => {
    const loadPosts = async () => {
      const { success, errors, posts } = await getAllPosts();
      if (success) {
        setPosts(posts);
      }
      console.log("success: ", success);
      console.log("errors: ", errors);
      console.log("posts: ", posts);
    };
    loadPosts();
  }, []);
  return (
    <div className='flex flex-col md:flex-row flex-1 gap-4 mt-4'>
      <div className=' w-full md:w-4/5 '>
        <div>
          <div className='flex gap-4 items-center'>
            <PostsIcon />
            <h1 className='text-xl'>Posts</h1>
          </div>
          <p className='text-mg pb-4'>
            Discover stories, thinking, and expertise from writers on any topic.{" "}
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <aside className='flex md:hidden  md:w-1/5 dark:bg-light-blue'>
            f
          </aside>
          {post.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      <aside className='hidden md:flex md:w-1/5 dark:bg-light-blue'></aside>
    </div>
  );
}

export default Home;
