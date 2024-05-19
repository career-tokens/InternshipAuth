"use client";

import { baseURL } from "@/utils/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { isLogin, setAuthentication } from "@/utils/auth";
import { AuroraBackground } from "./ui/aurora-background";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pageReady, setPageReady] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router.push("/");
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  }, [router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    axios
      .post(`${baseURL}/login`, payload)
      .then((res) => {
        console.log(res.data);

        setAuthentication(res.data.token);
        toast.success("Login Successful");
        router.push("/");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div
      className={`${pageReady ? "block" : "hidden"} flex flex-col-reverse lg:flex-row`}
    >
      <div className="h-screen flex flex-col justify-center w-full lg:w-[70%] bg-white dark:bg-gray-900">
        <AuroraBackground>
          <div className="text-center flex flex-col gap-y-8 z-[1000]">
            <h1 className="text-accent dark:text-neon font-bold text-4xl">
              Login to Your Account
            </h1>

            <form
              className="flex w-[300px] mx-auto flex-col pt-2 gap-2"
              onSubmit={handleSubmit}
              aria-labelledby="login-form-title"
            >
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dark:text-white px-4 py-2 outline-accent bg-gray-200 bg-opacity-[80%] rounded dark:border-2 dark:border-neon dark:bg-transparent"
                type="email"
                placeholder="Email"
                required
                aria-required="true"
              />
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dark:text-white px-4 py-2 outline-accent bg-gray-200 bg-opacity-[80%] rounded dark:border-2 dark:border-neon dark:bg-transparent"
                type="password"
                placeholder="Password"
                required
                aria-required="true"
              />
              <button 
                className="dark:text-gray-950 uppercase bg-accent dark:bg-neon px-4 py-2 text-white rounded mt-8"
                type="submit"
                aria-label="Login"
              >
                Login
              </button>
            </form>
          </div>
        </AuroraBackground>
      </div>

      <div className="bg-accent dark:bg-neon h-screen flex flex-col justify-center w-full lg:w-[30%]">
        <div className="text-center w-full text-white space-y-8">
          <h2 className="font-bold text-4xl dark:text-gray-900">Hello Friend!</h2>
          <div className="text-[#eeeeee] w-fit mx-auto dark:text-gray-900">
            <p>Enter your personal details</p>
            <p>and start your journey with us</p>

            <Link href="/signup">
              <button 
                className="dark:text-gray-900 uppercase px-4 py-2 w-[100%] rounded-full border-2 dark:border-gray-900 mt-8"
                aria-label="Sign up"
              >
                Sign up
              </button>
            </Link>
            <p className="mt-4 hidden sm:block lg:hidden">Scroll Below to Login</p>
            <p className="mt-4 sm:hidden">Swipe Below to Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
