/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export const Users = () => {
  const Link = import.meta.env.VITE_APP_LINK;
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const response = await axios.get(`${Link}/api/v1/user/bulk`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const requestedId = response.data.id;
    const users = response.data.user;
    setUsers(users.filter((user) => !(user._id == requestedId)));
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='ml-4 flex flex-col mr-2'>
      <div className='text-xl font-bold'>Users</div>
      <div className='mt-2'>
        {users.map((user, i) => (
          <User user={user} key={i} />
        ))}
      </div>
    </div>
  );
};

export const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between mr-2 my-2'>
      <div className='flex'>
        <div className='bg-slate-200 rounded-full h-12 w-12 flex justify-center items-center mt-1 mr-2'>
          <div className='text-2xl'>{user.firstName[0].toUpperCase()}</div>
        </div>
        <div className='flex flex-col justify-center h-full'>
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div>
        <Button
          label={"Send Money"}
          onClick={() => {
            navigate(`/send?id=${user._id}&name=${user.firstName}`);
          }}
        />
      </div>
    </div>
  );
};