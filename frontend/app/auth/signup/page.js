"use client";
import { useState, useEffect } from "react";
import FormD from "@/components/FormD.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/app/store/slices/apiSlices";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for Next.js

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const fields = [
    {
      name: "name",
      label: "Full Name",
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
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      class: "border-2 border-gray-300 rounded-lg p-2",
      validation: {
        required: true,
        email: true,
      },
    },
    {
      name: "birthday",
      label: "Birthday",
      type: "date",
      placeholder: "Enter your birth date",
      class: "border-2 border-gray-300 rounded-lg p-2",
      validation: {
        required: true,
      },
    },
    {
      name: "type",
      label: "Account Type",
      type: "select",
      placeholder: "Enter type",
      options: [
        { id: 1, name: "private" },
        { id: 2, name: "public" },
      ],
      class: "border-2 border-gray-300 rounded-lg p-2 col-span-2",
      validation: {
        required: true,
      },
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      placeholder: "Select your gender",
      options: [
        { id: 1, name: "male" },
        { id: 2, name: "female" },
        { id: 3, name: "Prefer not to say" },
      ],
      class: "border-2 border-gray-300 rounded-lg p-2 col-span-2",
      validation: {
        required: true,
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
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Enter your password again",
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
      fetchData({ url: "/auth/create", method: "POST", data })
    ).unwrap();
    if (result.token && result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("Authorization", result.token);
      router.push("/");
    }
  };

  // Set initial state with empty values to ensure controlled components
  const [model, setModel] = useState({
    name: "",
    userId: "",
    email: "",
    password: "",
    birthday: "",
    type: "",
    confirmPassword: "",
    gender: "",
    terms: false,
  });

  return (
    <div className="lg:w-[75rem] md:w-[83.3%] px-8 pt-[1.875em]  mx-auto">
      <img src="/images/logo.svg" alt="Logo" className="w-[7.75rem] md:mx-8" />

      <div className="flex justify-between md:gap-[5.9375rem] md:p-8">
        <img
          src="/images/signup.svg"
          alt="Logo"
          className=" h-full hidden lg:block"
        />
        <div className="grow">
          <div>
            <h1 className="text-[2.625rem] font-bold mb-[1.3125rem]">
              Sign up
            </h1>
            <p className=" mb-[2.0625rem]">
              Let’s get you all st up so you can access your personal account.
            </p>
          </div>
          <FormD
            model={model}
            fields={fields}
            onSubmit={formModel}
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
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#A052C6]">
              Login
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
