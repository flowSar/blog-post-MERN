import { Link } from "react-router";
import type { UserInterface } from "../utils/types";

function UserCard({ user }: { user: UserInterface }) {
  return (
    <Link
      to={`/dashboard/users/${user.username}/profile`}
      state={{ user }}
      className='dark:bg-dark-blue p-4 flex flex-col items-center rounded-lg'
    >
      <div className='h-28 w-28 rounded-full bg-blue-300 overflow-hidden'>
        {user.profileImage ? (
          <img src={user.profileImage} className='w-full h-full object-cover' />
        ) : (
          <div className='w-full h-full flex justify-center items-center text-2xl'>
            BR
          </div>
        )}
      </div>
      <div className='space-y-2 mt-2'>
        <h1 className='text-md text-xl font-bold'>{user.username}</h1>
        <h1 className='text-md text-gray-300'>{user.role}</h1>
        <div className='space-x-2'>
          <button className='px-4 py-2 bg-green-600 rounded-lg cursor-pointer'>
            Edit
          </button>
          <button className='px-4 py-2 bg-red-500 rounded-lg cursor-pointer'>
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
