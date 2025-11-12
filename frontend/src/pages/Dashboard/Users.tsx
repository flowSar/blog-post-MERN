import React from "react";
import type { UserInterface } from "../../utils/types";

interface UsersProps {
  users: UserInterface[];
}

function Users({ users }: UsersProps) {
  return (
    <div className='grid grid-cols-1 gap-y-4 p-2'>
      {/* {users.map((user) => (

        <LinearPostCard key={user._id} post={user} />
      ))} */}
    </div>
  );
}

export default Users;
