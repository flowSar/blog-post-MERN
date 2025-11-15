import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Posts from "./Posts";
import Users from "./Users";

function Dashboard() {
  const { user } = useAuth();
  const selected = localStorage.getItem("tab");

  const [selectedTab, setSelectedTab] = useState(selected ?? "Posts");

  const handleSectionSelection = (section: string) => {
    setSelectedTab(section);
  };
  const selectedSection = () => {
    localStorage.setItem("tab", selectedTab);
    switch (selectedTab) {
      case "Posts":
        return <Posts />;
      case "Users":
        return <Users />;
      default: {
        localStorage.setItem("tab", selectedTab);
      }
    }

    // return <Posts posts={posts} />;
  };

  // useEffect(() => {
  //   const selected = localStorage.getItem("tab");
  // }, []);
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
                selectedTab !== "Posts" || "bg-blue-400"
              }`}
            >
              Posts
            </li>
            <li
              onClick={() => handleSectionSelection("Users")}
              className={`py-2 px-4 cursor-pointer text-white ${
                selectedTab !== "Users" || "bg-blue-400"
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
            <ul className='flex px-2 py-2'>
              {/* <li className='py-2 px-4 bg-blue-600'>Home</li> */}
              <li
                onClick={() => handleSectionSelection("Posts")}
                className={`py-2 cursor-pointer hover:underline ${
                  selectedTab !== "Posts" || "text-red-400"
                }`}
              >
                Posts/
              </li>
              <li
                onClick={() => handleSectionSelection("Users")}
                className={`py-2 cursor-pointer hover:underline ${
                  selectedTab !== "Users" || "text-red-400"
                }`}
              >
                Users/
              </li>
            </ul>
          </aside>
        </div>
        {selectedSection()}
      </div>
    </div>
  );
}

export default Dashboard;
