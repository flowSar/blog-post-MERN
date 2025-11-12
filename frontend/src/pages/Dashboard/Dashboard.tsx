import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserPosts } from "../../services/api/PostApi";
import type { PostInterface } from "../../utils/types";
import LinearPostCard from "../../components/LinearPostCard";
import Posts from "./Posts";
import Users from "./Users";

function Dashboard() {
  const { isLogged, user } = useAuth();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [section, setSection] = useState("Posts");
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
  const handleSectionSelection = (section: string) => {
    console.log("permissions", user?.permissions);
    setSection(section);
  };
  const selectedSection = () => {
    switch (section) {
      case "Posts":
        return <Posts posts={posts} />;
      case "Users":
        return <Users users={[]} />;
    }
    // return <Posts posts={posts} />;
  };
  return (
    <div className='flex flex-col md:flex-row flex-1 gap-4 '>
      <aside className='hidden md:flex  md:w-1/6 bg-gray-100 text-white dark:text-black dark:bg-light-blue mt-4'>
        <div className=' w-full'>
          <ul className='flex flex-col gap-2 '>
            <li className='py-2 px-4 bg-red-400 font-bold dark:text-white text-center'>
              Role: {user?.role}
            </li>
            <li
              onClick={() => handleSectionSelection("Posts")}
              className={`py-2 px-4 cursor-pointer text-white ${
                section === "Posts" || "bg-blue-400"
              }`}
            >
              Posts
            </li>
            <li
              onClick={() => handleSectionSelection("Users")}
              className={`py-2 px-4 cursor-pointer text-white ${
                section === "Users" || "bg-blue-400"
              }`}
            >
              Users
            </li>
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
        {selectedSection()}
      </div>
    </div>
  );
}

export default Dashboard;
