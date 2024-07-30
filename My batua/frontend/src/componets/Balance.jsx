/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export const Balance = () => {
  const Link = import.meta.env.VITE_APP_LINK;
  const [value, setValue] = useState("");
  const getBalance = async () => {
    const response = await axios.get(`${Link}/api/v1/account/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setValue(response.data.balance);
  };

  useEffect(() => {
    getBalance();
  }, []);
  return (
    <div className='flex my-2 border-b-2 border-slate-100 pb-2'>
      <div className='font-bold text-xl ml-4'>Your balance:</div>
      <div className='font-semibold ml-2 text-xl'>Rs {parseInt(value)}</div>
    </div>
  );
};