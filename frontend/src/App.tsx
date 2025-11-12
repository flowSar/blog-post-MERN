import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layouts/Layout";
import Guest from "./components/Guest";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import Test from "./pages/Test";

function App() {
  const dark = localStorage.getItem("dark");
  if (dark) {
    document.documentElement.classList.add("dark");
  }

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path='/login'
            element={
              <Guest>
                <Login />
              </Guest>
            }
          />
          <Route
            path='/register'
            element={
              <Guest>
                <Register />
              </Guest>
            }
          />
          <Route
            path='/dashboard'
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          <Route
            path='/post/create'
            element={
              <Auth>
                <CreatePost />
              </Auth>
            }
          />
          <Route path='/posts/:id/edit' element={<EditPost />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/test' element={<Test />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
