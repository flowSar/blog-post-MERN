import { useState, type ChangeEvent } from "react";

import { useAuth } from "../context/AuthContext";

function Test() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    profileImage: user?.profileImage || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call here to update profile
    console.log("Updating profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      profileImage: user?.profileImage || "",
      bio: user?.bio || "",
    });
    setIsEditing(false);
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-[#0f1b2b] py-8 transition-colors duration-200'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Profile Header Card */}
        <div className='bg-white dark:bg-[#1b3559] rounded-xl shadow-lg overflow-hidden mb-6 transition-colors duration-200'>
          {/* Cover Image */}
          <div className='h-32 bg-gradient-to-r from-cyan-500 to-blue-500'></div>

          {/* Profile Info */}
          <div className='px-6 pb-6'>
            <div className='flex flex-col sm:flex-row items-start sm:items-end -mt-16 sm:-mt-12'>
              {/* Profile Image */}
              <div className='relative'>
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt={formData.username}
                    className='w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-[#1b3559] object-cover'
                  />
                ) : (
                  <div className='w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-[#1b3559] bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center'>
                    <span className='text-white text-4xl sm:text-5xl font-bold'>
                      {formData.username?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className='mt-4 sm:mt-0 sm:ml-6 flex-1'>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
                  {formData.username}
                </h1>
                <p className='text-gray-600 dark:text-gray-400 mt-1'>
                  {formData.email}
                </p>
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className='mt-4 sm:mt-0 px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all'
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Bio */}
            <div className='mt-6'>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                Bio
              </h2>
              <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                {formData.bio || "No bio added yet."}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className='bg-white dark:bg-[#1b3559] rounded-xl shadow-lg p-6 transition-colors duration-200'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Username */}
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f1b2b] text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors'
                  placeholder='Enter your username'
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f1b2b] text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors'
                  placeholder='Enter your email'
                />
              </div>

              {/* Profile Image URL */}
              <div>
                <label
                  htmlFor='profileImage'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Profile Image URL
                </label>
                <input
                  type='url'
                  id='profileImage'
                  name='profileImage'
                  value={formData.profileImage}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f1b2b] text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors'
                  placeholder='https://example.com/image.jpg'
                />
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor='bio'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Bio
                </label>
                <textarea
                  id='bio'
                  name='bio'
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f1b2b] text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors resize-none'
                  placeholder='Tell us about yourself...'
                />
              </div>

              {/* Action Buttons */}
              <div className='flex gap-4'>
                <button
                  type='submit'
                  className='flex-1 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all'
                >
                  Save Changes
                </button>
                <button
                  type='button'
                  onClick={handleCancel}
                  className='flex-1 px-6 py-3 rounded-lg font-medium bg-gray-200 dark:bg-[#0f1b2b] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-opacity-80 transition-colors'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6'>
          <div className='bg-white dark:bg-[#1b3559] rounded-xl shadow-lg p-6 transition-colors duration-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 dark:text-gray-400 text-sm font-medium'>
                  Posts
                </p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white mt-2'>
                  24
                </p>
              </div>
              <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-[#1b3559] rounded-xl shadow-lg p-6 transition-colors duration-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 dark:text-gray-400 text-sm font-medium'>
                  Followers
                </p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white mt-2'>
                  1.2K
                </p>
              </div>
              <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-[#1b3559] rounded-xl shadow-lg p-6 transition-colors duration-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 dark:text-gray-400 text-sm font-medium'>
                  Likes
                </p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white mt-2'>
                  3.5K
                </p>
              </div>
              <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className='mt-6 bg-white dark:bg-[#1b3559] rounded-xl shadow-lg p-6 transition-colors duration-200'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            Recent Posts
          </h2>
          <div className='space-y-4'>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className='flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-[#0f1b2b] transition-colors cursor-pointer'
              >
                <div className='flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500'></div>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
                    Sample Blog Post Title {item}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    Posted 2 days ago • 5 min read
                  </p>
                </div>
                <div className='flex items-center space-x-4 text-gray-500 dark:text-gray-400'>
                  <span className='flex items-center text-sm'>
                    <svg
                      className='w-4 h-4 mr-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                      />
                    </svg>
                    234
                  </span>
                  <span className='flex items-center text-sm'>
                    <svg
                      className='w-4 h-4 mr-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                      />
                    </svg>
                    45
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
