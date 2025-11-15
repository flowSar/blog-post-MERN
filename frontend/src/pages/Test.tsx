import { useState } from "react";

function Test() {
  const [selectedRole, setSelectedRole] = useState("user");
  const [permissions, setPermissions] = useState({
    createPost: false,
    editPost: false,
    deletePost: false,
    manageUsers: false,
    viewDashboard: false,
    moderateComments: false,
  });

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);

    // Auto-set permissions based on role
    if (role === "admin") {
      setPermissions({
        createPost: true,
        editPost: true,
        deletePost: true,
        manageUsers: true,
        viewDashboard: true,
        moderateComments: true,
      });
    } else if (role === "editor") {
      setPermissions({
        createPost: true,
        editPost: true,
        deletePost: false,
        manageUsers: false,
        viewDashboard: true,
        moderateComments: true,
      });
    } else {
      setPermissions({
        createPost: true,
        editPost: false,
        deletePost: false,
        manageUsers: false,
        viewDashboard: false,
        moderateComments: false,
      });
    }
  };

  const togglePermission = (permission: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const handleSave = () => {
    console.log("Saving role and permissions:", { selectedRole, permissions });
    // Add your save logic here
  };

  return (
    <section className='rounded-xl p-6 bg-[#1b3559] dark:bg-[#1b3559]'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold text-white'>Role and Permissions</h1>
        <div className='flex items-center space-x-2 text-sm text-gray-400'>
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
            />
          </svg>
          <span>Security Settings</span>
        </div>
      </div>

      {/* Role Selection */}
      <div className='mb-6'>
        <label className='block text-sm font-semibold text-gray-300 mb-2'>
          Select Role
        </label>
        <div className='relative'>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className='w-full py-3 px-4 pr-10 rounded-lg bg-[#0f1b2b] text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer transition-all'
          >
            <option value='user'>User</option>
            <option value='editor'>Editor</option>
            <option value='admin'>Admin</option>
          </select>
          <div className='absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none'>
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
        <p className='mt-2 text-xs text-gray-400'>
          {selectedRole === "admin" &&
            "Full access to all features and settings"}
          {selectedRole === "editor" &&
            "Can create and edit content, moderate comments"}
          {selectedRole === "user" && "Basic access to create content"}
        </p>
      </div>

      {/* Permissions Grid */}
      <div className='mb-6'>
        <h3 className='text-sm font-semibold text-gray-300 mb-4'>
          Permissions
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {/* Create Post */}
          <div
            onClick={() => togglePermission("createPost")}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              permissions.createPost
                ? "bg-cyan-500 bg-opacity-10 border-cyan-500"
                : "bg-[#0f1b2b] border-gray-700 hover:border-gray-600"
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    permissions.createPost
                      ? "bg-cyan-500 border-cyan-500"
                      : "border-gray-600"
                  }`}
                >
                  {permissions.createPost && (
                    <svg
                      className='w-3 h-3 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                </div>
                <span className='text-gray-200 font-medium'>Create Posts</span>
              </div>
            </div>
          </div>

          {/* Edit Post */}
          <div
            onClick={() => togglePermission("editPost")}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              permissions.editPost
                ? "bg-cyan-500 bg-opacity-10 border-cyan-500"
                : "bg-[#0f1b2b] border-gray-700 hover:border-gray-600"
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    permissions.editPost
                      ? "bg-cyan-500 border-cyan-500"
                      : "border-gray-600"
                  }`}
                >
                  {permissions.editPost && (
                    <svg
                      className='w-3 h-3 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                </div>
                <span className='text-gray-200 font-medium'>Edit Posts</span>
              </div>
            </div>
          </div>

          {/* Delete Post */}
          <div
            onClick={() => togglePermission("deletePost")}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              permissions.deletePost
                ? "bg-cyan-500 bg-opacity-10 border-cyan-500"
                : "bg-[#0f1b2b] border-gray-700 hover:border-gray-600"
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    permissions.deletePost
                      ? "bg-cyan-500 border-cyan-500"
                      : "border-gray-600"
                  }`}
                >
                  {permissions.deletePost && (
                    <svg
                      className='w-3 h-3 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                </div>
                <span className='text-gray-200 font-medium'>Delete Posts</span>
              </div>
            </div>
          </div>

          {/* Manage Users */}
          <div
            onClick={() => togglePermission("manageUsers")}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              permissions.manageUsers
                ? "bg-cyan-500 bg-opacity-10 border-cyan-500"
                : "bg-[#0f1b2b] border-gray-700 hover:border-gray-600"
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    permissions.manageUsers
                      ? "bg-cyan-500 border-cyan-500"
                      : "border-gray-600"
                  }`}
                >
                  {permissions.manageUsers && (
                    <svg
                      className='w-3 h-3 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                </div>
                <span className='text-gray-200 font-medium'>Manage Users</span>
              </div>
            </div>
          </div>

          {/* View Dashboard */}
          <div
            onClick={() => togglePermission("viewDashboard")}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              permissions.viewDashboard
                ? "bg-cyan-500 bg-opacity-10 border-cyan-500"
                : "bg-[#0f1b2b] border-gray-700 hover:border-gray-600"
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    permissions.viewDashboard
                      ? "bg-cyan-500 border-cyan-500"
                      : "border-gray-600"
                  }`}
                >
                  {permissions.viewDashboard && (
                    <svg
                      className='w-3 h-3 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                </div>
                <span className='text-gray-200 font-medium'>
                  View Dashboard
                </span>
              </div>
            </div>
          </div>

          {/* Moderate Comments */}
          <div
            onClick={() => togglePermission("moderateComments")}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              permissions.moderateComments
                ? "bg-cyan-500 bg-opacity-10 border-cyan-500"
                : "bg-[#0f1b2b] border-gray-700 hover:border-gray-600"
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    permissions.moderateComments
                      ? "bg-cyan-500 border-cyan-500"
                      : "border-gray-600"
                  }`}
                >
                  {permissions.moderateComments && (
                    <svg
                      className='w-3 h-3 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                </div>
                <span className='text-gray-200 font-medium'>
                  Moderate Comments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex items-center justify-end space-x-3 pt-4 border-t border-gray-700'>
        <button className='px-6 py-2 rounded-lg font-medium text-gray-300 hover:bg-[#0f1b2b] transition-colors'>
          Cancel
        </button>
        <button
          onClick={handleSave}
          className='px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all'
        >
          Save Changes
        </button>
      </div>
    </section>
  );
}

export default Test;
