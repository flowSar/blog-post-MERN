import { useRef, useState, type ChangeEvent } from "react";
import TextInput from "../components/TextInput";
import { useUploadImage } from "../hooks/useUploadImage";
import { register } from "../services/api/AuthApi";
import { redirect } from "react-router";
import uploadImageIcons from "../assets/icons/upload-img.svg";
import placoHolderImage from "../assets/icons/upload-img.png";
import LoadingOverlay from "../components/LoadingOverlay";

interface FormProps {
  profileImage: File | null;
  username: string;
  email: string;
  password: string;
}

function Register() {
  const { uploadImag, error } = useUploadImage();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewProfileImage, setPreviewProfileImage] = useState("");
  const [form, setForm] = useState<FormProps>({
    username: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const handleProfileImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPreviewProfileImage(URL.createObjectURL(file));
      setForm((old) => ({ ...old, profileImage: file }));
    }
  };

  const openFileManager = () => {
    inputRef.current?.click();
  };

  const handleSubmitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    if (form.profileImage) {
      try {
        const data = await uploadImag(form.profileImage!);
        if (data.imageUrl) {
          const formData = new FormData();
          formData.append("username", form.username);
          formData.append("password", form.password);
          formData.append("email", form.email);
          formData.append("profileImage", data.imageUrl);

          const { sucess, errors } = await register(formData);
          if (sucess) {
            redirect("/login");
          } else {
            console.log("errors:", errors);
          }
        } else {
          alert("uploading image failed try again");
        }
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='flex-1 flex justify-center items-center '>
      <div className=' w-md text-black dark:bg-light-blue py-8 px-8 rounded-lg'>
        <div className='flex justify-center items-center mb-6 cursor-pointer'>
          <div
            onClick={openFileManager}
            className='relative group h-34 w-34 rounded-full  flex items-center justify-center border border-gray-100 overflow-hidden'
          >
            <input
              ref={inputRef}
              type='file'
              className='hidden'
              accept='image/*'
              onChange={handleProfileImgChange}
              hidden
            />
            <img
              src={uploadImageIcons}
              className='absolute w-16 h-16 opacity-0 group-hover:opacity-100 duration-200'
            />
            {previewProfileImage ? (
              <>
                <img
                  src={previewProfileImage}
                  alt='profile'
                  className='w-full h-full object-cover'
                />
              </>
            ) : (
              <>
                <img
                  src={uploadImageIcons}
                  alt='profile'
                  className='w-16 h-16 object-cover'
                />
              </>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmitForm} className='space-y-4'>
          <TextInput
            label='Username'
            name={"username"}
            placeholder='Username'
            value={form.username}
            onChangeValue={(e) =>
              setForm((old) => ({ ...old, username: e.target.value }))
            }
          />
          <TextInput
            label='Email'
            name={"email"}
            placeholder='Email'
            value={form.email}
            onChangeValue={(e) =>
              setForm((old) => ({ ...old, email: e.target.value }))
            }
          />
          <TextInput
            label='Password'
            name={"password"}
            placeholder='Password'
            value={form.password}
            onChangeValue={(e) =>
              setForm((old) => ({ ...old, password: e.target.value }))
            }
          />
          <div className='text-center mt-6'>
            <input
              type='submit'
              disabled={loading}
              value={loading ? "loading...." : "Register"}
              className='dark:bg-dark-blue dark:text-white py-3 px-6 rounded-lg cursor-pointer'
            />
          </div>
        </form>
      </div>
      {loading ? <LoadingOverlay show={loading} /> : <></>}
    </div>
  );
}

export default Register;
