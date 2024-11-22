"use client";
import React from "react";
import { useState, useEffect } from "react";
import NotificationCounter from "@/components/NotificationCounter";
import { fetchData } from "@/app/store/slices/apiSlices";
import Link from "next/link";
import { useDispatch } from "react-redux";
function message() {
  const dispatch = useDispatch();
  const [contact, setContact] = useState([]);
  useEffect(() => {
    async function getData() {
      const result = await dispatch(
        fetchData({ url: "/contact/public-accounts" })
      ).unwrap();
      setContact(result);
    }
    getData();
  }, []);
  return (
    <div>
      <div className="bg-[#5F5F5F] h-[1px]"></div>
      {contact && (
        <div className="w-full flex justify-center items-center text-2xl font-bold h-[50vh]">
          Loading...
        </div>
      )}
      {contact && contact.message && contact.data && (
        <div className="w-full flex justify-center items-center text-2xl font-bold h-[50vh]">
          No public contact yet
        </div>
      )}
      {contact &&
        contact.data &&
        contact.data.map((e) => (
          <Link
            href={`/message/${e._id}`}
            className="flex gap-2 justify-between py-4 border-b border-[#5F5F5F]  px-4 mb-2 items-center hover:bg-slate-900  cursor-pointer transition-all duration-200"
            key={e._id}
          >
            <div className=" flex gap-2 items-center">
              <img
                src="/images/profile.svg"
                alt=""
                className="md:w-16 md:h-16 w-8 h-8"
              />
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">{e.name}</h1>
                <p className="text-sm md:text-md">{e.userId}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <NotificationCounter />
              <img src="/images/menu.svg" alt="" className="h-1" />
            </div>
          </Link>
        ))}
    </div>
  );
}

export default message;
