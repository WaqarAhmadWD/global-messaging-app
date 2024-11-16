"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FormD from "@/components/FormD.js";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "@/app/store/slices/apiSlices";
import { useRouter } from "next/navigation"; // Correct import for Next.js

// Set initial state with empty values to ensure controlled components

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [model, setModel] = useState({
    userId: "",
    password: "",
    terms: false,
  });

  const fields = [
    {
      name: "userId",
      label: "Username",
      type: "text",
      placeholder: "Enter your name",
      class: "border-2 border-gray-300 rounded-lg p-2",
      validation: {
        required: true,
        string: true,
        min: 2,
        max: 50,
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      class: "border-2 border-gray-300 rounded-lg p-2",
      // MainClass: "col-span-2",
      validation: {
        required: true,
      },
    },
  ];
  const formModel = async (data) => {
    if (!model.terms) {
      dispatch(fetchData({ throwMe: "Terms must be provided" }));
      return;
    }
    const result = await dispatch(
      fetchData({ url: "/auth/login", method: "POST", data })
    ).unwrap();
    if (result.token && result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("Authorization", result.token);
      router.push("/");
    }
  };

  return (
    <div className="lg:w-[75rem] md:w-[83.3%] px-8 pt-[1.875em]  mx-auto ">
      <img src="/images/logo.svg" alt="Logo" className="w-[7.75rem] md:mx-8" />

      <div className="flex justify-between md:gap-[5.9375rem] md:p-8">
        <img
          src="/images/signup.svg"
          alt="Logo"
          className=" h-full hidden lg:block"
        />
        <div className="grow">
          <div>
            <h1 className="text-[2.625rem] font-bold mb-[1.3125rem]">Login</h1>
            <p className=" mb-[2.0625rem]">
              Let’s get you all st up so you can access your personal account.
            </p>
          </div>
          <FormD
            model={model}
            fields={fields}
            onSubmit={formModel}
            custom_className={{ main: "flex flex-col gap-4" }}
            rest={
              <div className="flex gap-2 col-span-2 items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={model.terms}
                  onChange={(e) =>
                    setModel({ ...model, terms: e.target.checked })
                  }
                />
                <div className="flex gap-1">
                  <p className="text-[10px] md:text-[16px]">
                    I agree to all the{" "}
                  </p>
                  <p className="text-[10px] md:text-[16px]">
                    <span className="text-[#A052C6]">Terms</span> and clear
                  </p>
                  <p className="text-[10px] md:text-[16px]">
                    <span className="text-[#A052C6]">Privacy Policies</span>
                  </p>
                </div>
              </div>
            }
          />
          <div className="flex justify-center items-center mb-4">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-[#A052C6]">
              Signup{" "}
            </Link>
          </div>
          <div className="flex justify-between items-center flex-col md:flex-row gap-4">
            <p>Or Sin up with</p>
            <div className="border-[1px] border-black px-16 py-4 rounded-lg">
              google
            </div>
            <div className="border-[1px] border-black px-16 py-4 rounded-lg">
              facebook
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
