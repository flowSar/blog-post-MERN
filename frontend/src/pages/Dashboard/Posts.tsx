import { useEffect, useState } from "react";
import type { PostInterface } from "../../utils/types";
import LinearPostCard from "../../components/LinearPostCard";
import { getUserPosts } from "../../services/api/PostApi";
import { useAuth } from "../../context/AuthContext";

function Posts() {
  const { user } = useAuth();
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
    <div className='grid grid-cols-1 gap-y-4 p-2'>
      {posts.map((post) => (
        <LinearPostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
