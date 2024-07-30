/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export const AppBar = () => {
  const Link = import.meta.env.VITE_APP_LINK;
  const navigate = useNavigate();
  const [user, setUser] = useState([
    {
      firstName: "",
    },
  ]);
  const getUser = useCallback(async () => {
    const response = await axios.get(`${Link}/api/v1/user/bulk`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const requestedId = response.data.id;
    const users = response.data.user;
    setUser(users.filter((user) => user._id == requestedId));
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='flex justify-between h-14 shadow'>
      <div className='flex flex-col justify-center ml-4 text-xl font-bold h-full'>
        Payments App
      </div>
      <div className='flex'>
        <div className='flex flex-col justify-center h-full mr-4'>
          Hello, {user[0].firstName}
        </div>
        <div className='rounded-full bg-slate-200 h-12 w-12 flex justify-center mt-1 mr-2'>
          <div
            className='flex justify-center items-center text-xl cursor-pointer'
            onClick={() => {
              localStorage.clear("token");
              navigate("/signin");
            }}>
            {user[0].firstName.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
};