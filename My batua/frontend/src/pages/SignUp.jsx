/* eslint-disable react-hooks/exhaustive-deps */
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const Link = import.meta.env.VITE_APP_LINK;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    <div className='h-screen bg-slate-500 flex justify-center'>
      <div className='flex flex-col justify-center items-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            inputType={"text"}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            inputType={"text"}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputBox
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            inputType={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"12345678"}
            inputType={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='pt-4'>
            <Button
              label={"Sign up"}
              onClick={async () => {
                const response = await axios.post(
                  `${Link}/api/v1/user/signup`,
                  {
                    firstName,
                    lastName,
                    username: email,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                navigate("/dashboard");
              }}
            />
          </div>
          <BottomWarning
            label1={"Already have an account? "}
            label2={"Sign in"}
            href={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
