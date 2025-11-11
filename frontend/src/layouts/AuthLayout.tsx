function AuthLayout() {
  return (
    <div className='w-full'>
      <div id='header'>
        <span>Home</span>
        <div>
          <ul className='flex gap-4'>
            <li>
              <a>Login</a>
            </li>
            <li>
              <a>Register</a>
            </li>
            {/* <li><a>Profile</a></li>
          <li><a>Logout</a></li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
