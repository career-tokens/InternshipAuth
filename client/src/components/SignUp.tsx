"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, FormEvent } from "react";

import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa6";
import { baseURL } from "../utils/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isLogin } from "@/utils/auth";
import { AuroraBackground } from "./ui/aurora-background";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
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
      name,
      email,
      password,
    };

    axios
      .post(`${baseURL}/signup`, payload)
      .then((res) => {
        toast.success(
          <div>
            Account Created Successfully <br /> Please Login in
          </div>
        );
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div
      className={`${pageReady ? "block" : "hidden"} flex flex-col lg:flex-row`}
    >
      <div className="bg-accent dark:bg-neon h-screen grid place-items-center w-full lg:w-[30%]">
        <div className="text-center w-full text-white space-y-8">
          <h2 className="font-bold text-4xl dark:text-gray-950">Welcome Back!</h2>
          <div className="text-[#eeeeee] w-fit mx-auto dark:text-gray-950">
            <p>To keep connected with us please</p>
            <p>please login with your personal info</p>

            <Link href="/login">
              <button 
                className="dark:text-gray-950 dark:border-gray-950 uppercase px-4 py-2 w-[100%] rounded-full border-2 mt-8"
                aria-label="Login"
              >
                Login
              </button>
            </Link>
            <p className="mt-4 hidden sm:block lg:hidden">Scroll Below to Register</p>
            <p className="mt-4 sm:hidden">Swipe Below to Register</p>
          </div>
        </div>
      </div>

      <div className="h-screen flex flex-col justify-center w-full lg:w-[70%]">
        <AuroraBackground>
          <div className="text-center flex flex-col gap-y-8 z-[1000]">
            <h1 id="signup-form-title" className="text-accent font-bold text-4xl dark:text-neon">Create Account</h1>

            <form
              className="flex w-[300px] mx-auto flex-col pt-2 gap-2"
              onSubmit={handleSubmit}
              aria-labelledby="signup-form-title"
            >
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="dark:text-white px-4 py-2 outline-accent bg-gray-200 bg-opacity-[80%] rounded dark:border-2 dark:border-neon dark:bg-transparent"
                type="text"
                placeholder="Name"
                required
                aria-required="true"
              />
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
                className="dark:bg-neon dark:text-gray-950 uppercase bg-accent hover:bg-accentDark px-4 py-2 rounded text-white mt-8"
                type="submit"
                aria-label="Sign up"
              >
                Sign up
              </button>
            </form>
          </div>
        </AuroraBackground>
      </div>
    </div>
  );
};

export default SignUp;
