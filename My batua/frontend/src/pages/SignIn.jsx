import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const SignIn = () => {
  const Link = import.meta.env.VITE_APP_LINK;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkToken = useCallback(async (token) => {
    try {
      const response = await axios.post(`${Link}/api/v1/user/me`, {
        token,
      });

      response.data.valid && navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    checkToken(token);
  }, []);
  return (
    <div className='h-screen bg-slate-500 flex justify-center '>
      <div className='flex flex-col justify-center items-center'>
        <div className='bg-white rounded w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            inputType={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label={"Password"}
            inputType={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='pt-4'>
            <Button
              label={"Sign In"}
              onClick={async () => {
                const response = await axios.post(
                  `${Link}/api/v1/user/signin`,
                  {
                    username: email,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                setEmail("");
                setPassword("");
                navigate("/dashboard");
              }}
            />
          </div>
          <BottomWarning
            label1={"Don't have an account? "}
            label2={"Sign Up"}
            href={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;