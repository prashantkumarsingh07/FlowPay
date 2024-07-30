/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Link = import.meta.env.VITE_APP_LINK;
  const navigate = useNavigate();

  const checkToken = useCallback(async (token) => {
    try {
      const response = await axios.post(`${Link}/api/v1/user/me`, {
        token,
      });
      response.data.valid ? navigate("/dashboard") : navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    checkToken(token);
  }, []);

  return <></>;
};

export default Home;