import React, { useEffect, useState } from "react";
import type { UserInterface } from "../../utils/types";
import UserCard from "../../components/UserCard";
import { getAllUsers } from "../../services/api/userApi";

interface UsersProps {
  users: UserInterface[];
}

function Users() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { success, data } = await getAllUsers();
        if (success) {
          setUsers(data);
        }
      } catch (error) {
        console.log("error loging users :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  if (loading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        loading....
      </div>
    );
  } else {
    return (
      <div className='grid grid-cols-[repeat(auto-fill,_minmax(216px,_1fr))] gap-2 p-4'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

export default Users;
