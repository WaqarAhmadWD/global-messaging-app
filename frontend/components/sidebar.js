"use client";
import Link from "next/link";
import NotificationCounter from "./NotificationCounter";
import { usePathname } from "next/navigation";
const sidebarComponent = () => {
  const pathname = usePathname(); // Get the current route

  const chats = [
    { id: 0, url: "/", img: "/images/all_chats.svg", title: "All Chats" },
    { id: 1, url: "/1", img: "/images/grou_chats.svg", title: "Group Chats" },
    { id: 2, url: "/2", img: "/images/stores.svg", title: "Stories" },
    {
      id: 3,
      url: "/Chat_request",
      img: "/images/chat_requests.svg",
      title: "Chat Requests",
    },
    { id: 4, url: "/3", img: "/images/archive.svg", title: "Archive" },
    { id: 5, url: "/4", img: "/images/globe.svg", title: "Public Club" },
  ];
  return (
    <div className=" left-0 top-0 h-full lg:w-64 hidden lg:block fixed  border-r text-white bg-black">
      <div className="flex flex-col justify-between w-full h-full p-4 gap-y-6">
        <div className="w-full flex justify-center pt-2">
          <img src="images/dark-logo.svg" alt="" className="w-fit" />
        </div>
        <div className="grow">
          {chats.map((e) => {
            return (
              <Link
                key={e.id}
                className={`m-2 px-4 py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center ${
                  pathname === e.url ? "bg-gray-700" : ""
                }`}
                href={e.url}
              >
                <div className="flex gap-2 items-center">
                  <img src={e.img} alt="" className="w-4" />
                  <div>{e.title}</div>
                </div>
                <NotificationCounter />
              </Link>
            );
          })}
        </div>
        <div>
          <div className="m-2 px-4 py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center">
            <div className="flex gap-2 items-center">
              <img src="images/setting.svg" alt="" className="w-4" />
              <div>setting</div>
            </div>
          </div>
          <Link
            href="/auth/login"
            className="m-2 px-4 py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center"
          >
            <div className="flex gap-2 items-center">
              <img src="/images/logout-door.svg" alt="" />
              <div>login</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default sidebarComponent;
