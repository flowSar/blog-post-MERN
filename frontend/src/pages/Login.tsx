import { useState, type ChangeEvent } from "react";
import TextInput from "../components/TextInput";
import Layout from "../layouts/Layout";
import { login } from "../services/api/AuthApi";
import { redirect, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

interface FormProps {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormProps>({
    username: "",
    password: "",
  });

  const handleSubmitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);

      const { success, errors } = await login(formData);

      if (success) {
        checkAuth?.();
        navigate("/");
      } else {
        console.log(errors);
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex-1 flex justify-center items-center '>
      <div className=' w-md text-black dark:bg-light-blue py-8 px-8 rounded-lg'>
        <div>
          <h1 className='text-6xl text-center dark:text-white font-bold py-6 mb-6'>
            Login
          </h1>
        </div>
        <form onSubmit={handleSubmitForm} className='space-y-4'>
          <TextInput
            label='Username/Email'
            name={"username"}
            placeholder='Username/Email'
            value={form.username}
            onChangeValue={(e) =>
              setForm((old) => ({ ...old, username: e.target.value }))
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
              value={loading ? "loading...." : "LogIn"}
              className='dark:bg-dark-blue dark:text-white py-3 px-6 rounded-lg cursor-pointer'
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
