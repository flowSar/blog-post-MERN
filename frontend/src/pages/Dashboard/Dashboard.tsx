import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserPosts } from "../../services/api/PostApi";
import type { PostInterface } from "../../utils/types";
import LikeIcon from "../../components/icons/LikeIcon";
import CommentIcon from "../../components/icons/CommentIcon";
import LinearPostCard from "../../components/LinearPostCard";

function Dashboard() {
  const { isLogged, user } = useAuth();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  useEffect(() => {
    const loadPost = async () => {
      if (user) {
        const { success, posts } = await getUserPosts(user.id);
        if (success) {
          setPosts(posts);
        }
      }
    };
    loadPost();
  }, []);
  return (
    <div className='flex flex-col md:flex-row flex-1 gap-4 '>
      <aside className='hidden md:flex  md:w-1/6 bg-gray-100 text-white dark:text-black dark:bg-light-blue mt-4'>
        <div className=' w-full'>
          <ul className='flex flex-col gap-2 '>
            {/* <li className='py-2 px-4 bg-blue-600'>Home</li> */}
            <li className='py-2 px-4 bg-blue-600'>Posts</li>
          </ul>
        </div>
      </aside>
      <div className='w-full md:w-5/6 bg-gray-100 dark:bg-light-blue mt-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <aside className='flex md:hidden  md:w-1/6 '>
            <ul className='flex flex-col gap-2 '>
              {/* <li className='py-2 px-4 bg-blue-600'>Home</li> */}
              <li className='py-2 px-4 '>Posts/</li>
            </ul>
          </aside>
        </div>
        <div className='grid grid-cols-1 gap-y-4 p-2'>
          {posts.map((post) => (
            <LinearPostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
