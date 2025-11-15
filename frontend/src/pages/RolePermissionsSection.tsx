import { use, useState, type ChangeEvent } from "react";
import type { UserInterface } from "../utils/types";
import { updateUserRolePermissions } from "../services/api/userApi";
import { useNavigate } from "react-router";

interface PermissionsInterface {
  create_post: boolean;
  delete_post: boolean;
  update_post: boolean;
  delete_user: boolean;
  update_user: boolean;
  moderate_comments: boolean;
  view_dashboard: boolean;
}

type permissionsKey =
  | "create_post"
  | "delete_post"
  | "update_post"
  | "delete_user"
  | "update_user"
  | "moderate_comments"
  | "view_dashboard";

function RolePermissionsSection({ user }: { user: UserInterface }) {
  const navigate = useNavigate();
  const userPermissions = user.permissions || [];
  const userId = user._id;
  const [role, setRole] = useState(user.role);
  const [permissions, setPermission] = useState<PermissionsInterface>({
    create_post: userPermissions.includes("create_post"),
    delete_post: userPermissions.includes("delete_post"),
    update_post: userPermissions.includes("update_post"),
    delete_user: userPermissions.includes("delete_user"),
    update_user: userPermissions.includes("update_user"),
    moderate_comments: userPermissions.includes("moderate_comments"),
    view_dashboard: userPermissions.includes("view_dashboard"),
  });

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };

  const handPermissionsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value as permissionsKey;
    const result = permissions[key];
    setPermission((old) => ({
      ...old,
      [key]: !permissions[key],
    }));
  };

  const saveChanges = async () => {
    try {
      const keys = Object.keys(permissions);
      const formData = new FormData();
      formData.append("role", role);

      keys.forEach((key) => {
        if (permissions[key as permissionsKey]) {
          formData.append("permissions[]", key);
        }
      });
      const { success, user, message, errors } =
        await updateUserRolePermissions(userId, formData);
      if (success) {
        console.log("user: ", user);
        alert("user permissions and role updated successfully");
        navigate(-1);
      } else {
        alert(
          `update user role and permissions failed: ${message} ${errors["id"]} ${errors["role"]}`
        );
      }
    } catch (error) {
      alert("update permission failed");
      console.log("updte failed: ", error);
    }
  };

  return (
    <section className='bg-light-blue p-4'>
      <h1 className='text-2xl'>Role and Permissions</h1>
      <div className='relative'>
        <select
          className='w-full py-3 px-4 pr-10 mt-4 dark:bg-dark-blue focus:border-transparent focus:outline-none rounded-lg focus:ring-2 focus:ring-cyan-500  cursor-pointer duration-200 appearance-none'
          onChange={handleRoleChange}
          value={`${role}`}
        >
          <option value='user'>User</option>
          <option value='editor'>Editor</option>
          <option value='admin'>Admin</option>
        </select>
        <div className='absolute right-4 top-8 cursor-pointer pointer-events-none'>
          <svg
            className='w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </div>
      <h2>Permissions</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex p-4 dark:bg-dark-blue space-x-4 items-center'>
          <input
            id='create_post'
            type='checkbox'
            className='w-4 h-4 accent-blue-500 '
            value='create_post'
            checked={permissions.create_post}
            onChange={handPermissionsChange}
          />
          <label htmlFor='create_post' className='flex-1 cursor-pointer'>
            Create Post
          </label>
        </div>
        <div className='flex p-4 dark:bg-dark-blue space-x-4 items-center'>
          <input
            id='delete_post'
            type='checkbox'
            className='w-4 h-4 accent-blue-500'
            value='delete_post'
            onChange={handPermissionsChange}
            checked={permissions.delete_post}
          />
          <label htmlFor='delete_post' className='flex-1 cursor-pointer'>
            Delete Post
          </label>
        </div>
        <div className='flex p-4 dark:bg-dark-blue space-x-4 items-center'>
          <input
            id='update_post'
            type='checkbox'
            className='w-4 h-4 accent-blue-500'
            value='update_post'
            onChange={handPermissionsChange}
            checked={permissions.update_post}
          />
          <label htmlFor='update_post' className='flex-1 cursor-pointer'>
            Update Post
          </label>
        </div>
        <div className='flex p-4 dark:bg-dark-blue space-x-4 items-center'>
          <input
            id='delete_user'
            type='checkbox'
            className='w-4 h-4 accent-blue-500'
            value='delete_user'
            onChange={handPermissionsChange}
            checked={permissions.delete_user}
          />
          <label htmlFor='delete_user' className='flex-1 cursor-pointer'>
            Delete User
          </label>
        </div>
        <div className='flex p-4 dark:bg-dark-blue space-x-4 items-center'>
          <input
            id='update_user'
            type='checkbox'
            className='w-4 h-4 accent-blue-500'
            value='update_user'
            onChange={handPermissionsChange}
            checked={permissions.update_user}
          />
          <label htmlFor='update_user' className='flex-1 cursor-pointer'>
            Update User
          </label>
        </div>
        <div className='flex p-4 dark:bg-dark-blue space-x-4 items-center'>
          <input
            id='moderate_comments'
            type='checkbox'
            className='w-4 h-4 accent-blue-500'
            value='moderate_comments'
            onChange={handPermissionsChange}
            checked={permissions.moderate_comments}
          />
          <label htmlFor='moderate_comments' className='flex-1 cursor-pointer'>
            Moderate Comments
          </label>
        </div>
        <div className='flex p-4 dark:bg-dark-blue space-x-4 items-center'>
          <input
            id='view_dashboard'
            type='checkbox'
            className='w-4 h-4 accent-blue-500'
            value='view_dashboard'
            onChange={handPermissionsChange}
            checked={permissions.view_dashboard}
          />
          <label htmlFor='view_dashboard' className='flex-1 cursor-pointer'>
            View Dashboard
          </label>
        </div>
      </div>
      <div className='mt-10 flex space-x-4 w-full justify-end'>
        {/* <button className='py-2 px-6 bg-gray-400 rounded-lg'>Cancel</button> */}
        {/* <Admin>
          
        </Admin> */}
        <button
          onClick={saveChanges}
          className='py-2 px-6 bg-linear-to-r from-blue-400 to-blue-700 rounded-lg cursor-pointer'
        >
          Save Changes
        </button>
      </div>
    </section>
  );
}

export default RolePermissionsSection;
