import { useEffect, useState, type ChangeEvent } from "react";
import TextInput from "../../components/TextInput";
import { useLocation } from "react-router";
import RolePermissionSection from "../RolePermissionsSection";

function UserProfile() {
  const location = useLocation();
  const user = location.state?.user;
  console.log("user: ", location.state.user);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    profileImage: user?.profileImage || "",
    bio: user?.bio || "",
  });

  useEffect(() => {}, []);

  const changeVisibility = () => {
    setIsEditing((old) => !old);
  };
  return (
    <div className='w-[95%] md:w-[72%] mx-auto flex flex-col gap-6'>
      <section
        id='heder'
        className=' bg-light-blue  mt-6 rounded-lg overflow-hidden'
      >
        <div className='h-32 bg-blue-400'></div>

        <div className='flex flex-col px-4 pb-4 -mt-10'>
          <div className='flex flex-col sm:flex-row  gap-6 items-start sm:items-end'>
            <div className='h-28 w-28 rounded-full  ring-4 ring-light-blue overflow-hidden'>
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.username}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full bg-blue-300 flex justify-center items-center text-4xl'>
                  {user?.username.slice(0, 2)}
                </div>
              )}
            </div>
            <div className='flex flex-col sm:flex-row justify-between flex-1 space-y-4 sm:space-y-0'>
              <div className='space-y-1'>
                <h1 className='text-2xl md:text-3xl font-bold'>
                  {formData.username}
                </h1>
                <h4 className='text-gray-400 text-md'>{formData.email}</h4>
              </div>

              {!isEditing ? (
                <button
                  onClick={changeVisibility}
                  className='self-start sm:self-end py-2 px-6 bg-blue-400 rounded-lg cursor-pointer font-bold'
                >
                  Edite Profile
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className='p-4 '>
            <h3 className='text-lg font-bold'>Bio</h3>
            {user?.bio || <p>No bio added yet.</p>}
          </div>
        </div>
      </section>

      {isEditing ? (
        <section id='editprofile' className=' bg-light-blue rounded-lg p-4'>
          <h1 className='text-2xl text-white font-bold'>Edit Profile</h1>
          <div className='space-y-2 pt-4'>
            <TextInput
              label='Username:'
              name='username'
              value={formData.username}
              onChangeValue={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              }}
            />
            <TextInput
              label='Email:'
              name='email'
              value={formData.email}
              onChangeValue={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              }}
            />
            <TextInput
              label='Profile Image URL:'
              name='profileimg'
              value={formData.profileImage}
              onChangeValue={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              }}
            />
            <div className='flex flex-col'>
              <label htmlFor='bio'>bio</label>
            </div>
            <textarea
              id='bio'
              value={formData.bio}
              className='w-full mt-2 py-4 px-4 bg-gray-100 dark:bg-dark-blue dark:text-white rounded-md focus:outline-none'
              rows={3}
              placeholder='Tell us about yourself...'
            ></textarea>
          </div>
          <div className='w-full flex space-x-4 pt-4 pb-4'>
            <button
              onClick={changeVisibility}
              className='flex-1 py-2 px-6 bg-linear-to-r from-blue-500 to-blue-700 rounded-lg cursor-pointer'
            >
              Cancel
            </button>
            <button
              onClick={changeVisibility}
              className='flex-1 py-2 px-6 bg-linear-to-r from-green-600 to-green-800 rounded-lg cursor-pointer'
            >
              Save Changes
            </button>
          </div>
        </section>
      ) : (
        <></>
      )}

      <RolePermissionSection user={user} />
    </div>
  );
}

export default UserProfile;
