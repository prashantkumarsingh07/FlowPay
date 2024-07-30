/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const Link = import.meta.env.VITE_APP_LINK;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const checkToken = useCallback(async (token) => {
    try {
      const response = await axios.post(`${Link}/api/v1/user/me`, {
        token,
      });

      !response.data.valid && navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    checkToken(token);
  }, []);

  return (
    <div className='bg-slate-500 h-screen flex justify-center shadow-lg  '>
      <div className='flex flex-col justify-center item-center'>
        <div className='bg-white rounded-xl w-96 h-max text-center p-4'>
          <div>
            <Heading label={"Send Money"} />
          </div>
          <div className='flex my-5'>
            <div className='flex justify-center items-center rounded-full bg-green-500 h-12 w-12 mt-1 mr-2'>
              <div className='text-2xl text-white'>{name[0].toUpperCase()}</div>
            </div>
            <div className='flex justify-center items-center font-medium  text-xl '>
              <div>{name}</div>
            </div>
          </div>
          <div className='my-5'>
            <InputBox
              label={"Amount (in Rs)"}
              placeholder={"Enter amount"}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={async () => {
                const response = await axios.post(
                  `${Link}/api/v1/account/transfer`,
                  {
                    to: id,
                    amount,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                console.log(response);
                if (response.status === 200) {
                  alert("Transaction Success");
                  navigate("/dashboard");
                }
              }}
              className='text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white rounded-md'>
              Intiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;